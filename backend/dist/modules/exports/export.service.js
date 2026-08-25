"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ExcelJS = __importStar(require("exceljs"));
const timetable_entry_service_1 = require("../timetable-entries/timetable-entry.service");
const class_schema_1 = require("../../schemas/class.schema");
const teacher_schema_1 = require("../../schemas/teacher.schema");
const room_schema_1 = require("../../schemas/room.schema");
const time_slot_schema_1 = require("../../schemas/time-slot.schema");
const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const DAY_LABELS = {
    MONDAY: 'Thứ Hai',
    TUESDAY: 'Thứ Ba',
    WEDNESDAY: 'Thứ Tư',
    THURSDAY: 'Thứ Năm',
    FRIDAY: 'Thứ Sáu',
};
let ExportService = class ExportService {
    timetableEntryService;
    classModel;
    teacherModel;
    roomModel;
    timeSlotModel;
    constructor(timetableEntryService, classModel, teacherModel, roomModel, timeSlotModel) {
        this.timetableEntryService = timetableEntryService;
        this.classModel = classModel;
        this.teacherModel = teacherModel;
        this.roomModel = roomModel;
        this.timeSlotModel = timeSlotModel;
    }
    async buildMasterWorkbook(academicYearId) {
        const [entries, classes, timeSlots] = await Promise.all([
            this.timetableEntryService.findAll(academicYearId),
            this.classModel
                .find({ isActive: true, ...(academicYearId ? { academicYearId } : {}) })
                .sort({ grade: 1, name: 1 }),
            this.timeSlotModel.find({ isActive: true }).sort({ order: 1 }),
        ]);
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Bảng Tổng');
        const headerRow1 = ['', ''];
        const headerRow2 = ['Thứ', 'Tiết'];
        let col = 3;
        const gradeSpans = [];
        let currentGrade = null;
        let spanStart = col;
        for (const cls of classes) {
            if (currentGrade === null)
                currentGrade = cls.grade;
            if (cls.grade !== currentGrade) {
                gradeSpans.push({ grade: currentGrade, start: spanStart, end: col - 1 });
                currentGrade = cls.grade;
                spanStart = col;
            }
            headerRow2.push(cls.name);
            col++;
        }
        if (currentGrade !== null) {
            gradeSpans.push({ grade: currentGrade, start: spanStart, end: col - 1 });
        }
        sheet.addRow(headerRow1);
        sheet.addRow(headerRow2);
        for (const span of gradeSpans) {
            sheet.mergeCells(1, span.start, 1, span.end);
            sheet.getCell(1, span.start).value = `KHỐI ${span.grade}`;
            sheet.getCell(1, span.start).alignment = { horizontal: 'center' };
        }
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(2).font = { bold: true };
        for (const day of DAYS) {
            const dayStartRow = sheet.rowCount + 1;
            for (const slot of timeSlots) {
                const row = [
                    DAY_LABELS[day],
                    slot.type === 'BREAK' ? 'Nghỉ' : `Tiết ${slot.period}`,
                ];
                for (const cls of classes) {
                    const entry = entries.find((e) => e.dayOfWeek === day &&
                        String(e.timeSlotId?._id) === String(slot._id) &&
                        String(e.classId?._id) === String(cls._id));
                    row.push(entry ? entry.subjectId?.shortName || entry.subjectId?.name || '' : '');
                }
                sheet.addRow(row);
            }
            const dayEndRow = sheet.rowCount;
            if (dayEndRow > dayStartRow) {
                sheet.mergeCells(dayStartRow, 1, dayEndRow, 1);
            }
        }
        sheet.getColumn(1).width = 12;
        sheet.getColumn(2).width = 10;
        for (let i = 3; i < 3 + classes.length; i++) {
            sheet.getColumn(i).width = 12;
        }
        sheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });
        return workbook;
    }
    async buildGridWorkbook(title, entries, timeSlots, renderCell) {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(title.substring(0, 31));
        const headerRow = ['Tiết / Giờ', ...DAYS.map((d) => DAY_LABELS[d])];
        sheet.addRow(headerRow);
        sheet.getRow(1).font = { bold: true };
        for (const slot of timeSlots) {
            const row = [
                slot.type === 'BREAK' ? 'Nghỉ' : `Tiết ${slot.period} (${slot.startTime}-${slot.endTime})`,
            ];
            for (const day of DAYS) {
                const entry = entries.find((e) => e.dayOfWeek === day && String(e.timeSlotId?._id) === String(slot._id));
                row.push(entry ? renderCell(entry) : '');
            }
            sheet.addRow(row);
        }
        sheet.getColumn(1).width = 22;
        for (let i = 2; i <= DAYS.length + 1; i++)
            sheet.getColumn(i).width = 18;
        sheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' },
                };
                cell.alignment = { wrapText: true, vertical: 'top' };
            });
        });
        return workbook;
    }
    async buildClassWorkbook(classId) {
        const classDoc = await this.classModel.findById(classId);
        if (!classDoc)
            throw new common_1.NotFoundException('Class not found');
        const [entries, timeSlots] = await Promise.all([
            this.timetableEntryService.findByClass(classId),
            this.timeSlotModel.find({ isActive: true }).sort({ order: 1 }),
        ]);
        return this.buildGridWorkbook(`TKB ${classDoc.name}`, entries, timeSlots, (e) => {
            const parts = [e.subjectId?.name];
            if (e.teacherId?.name)
                parts.push(e.teacherId.name);
            if (e.roomId?.name)
                parts.push(e.roomId.name);
            return parts.filter(Boolean).join('\n');
        });
    }
    async buildTeacherWorkbook(teacherId) {
        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        const [entries, timeSlots] = await Promise.all([
            this.timetableEntryService.findByTeacher(teacherId),
            this.timeSlotModel.find({ isActive: true }).sort({ order: 1 }),
        ]);
        return this.buildGridWorkbook(`TKB ${teacher.name}`, entries, timeSlots, (e) => {
            const parts = [e.subjectId?.name, e.classId?.name];
            if (e.roomId?.name)
                parts.push(e.roomId.name);
            return parts.filter(Boolean).join('\n');
        });
    }
    async buildRoomWorkbook(roomId) {
        const room = await this.roomModel.findById(roomId);
        if (!room)
            throw new common_1.NotFoundException('Room not found');
        const [entries, timeSlots] = await Promise.all([
            this.timetableEntryService.findByRoom(roomId),
            this.timeSlotModel.find({ isActive: true }).sort({ order: 1 }),
        ]);
        return this.buildGridWorkbook(`TKB ${room.name}`, entries, timeSlots, (e) => {
            const parts = [e.subjectId?.name, e.classId?.name];
            if (e.teacherId?.name)
                parts.push(e.teacherId.name);
            return parts.filter(Boolean).join('\n');
        });
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(2, (0, mongoose_1.InjectModel)(teacher_schema_1.Teacher.name)),
    __param(3, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __param(4, (0, mongoose_1.InjectModel)(time_slot_schema_1.TimeSlot.name)),
    __metadata("design:paramtypes", [timetable_entry_service_1.TimetableEntryService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ExportService);
//# sourceMappingURL=export.service.js.map