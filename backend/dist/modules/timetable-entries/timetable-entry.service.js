"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetableEntryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const timetable_entry_schema_1 = require("../../schemas/timetable-entry.schema");
const academic_year_schema_1 = require("../../schemas/academic-year.schema");
const class_schema_1 = require("../../schemas/class.schema");
const subject_schema_1 = require("../../schemas/subject.schema");
const teacher_schema_1 = require("../../schemas/teacher.schema");
const room_schema_1 = require("../../schemas/room.schema");
const time_slot_schema_1 = require("../../schemas/time-slot.schema");
let TimetableEntryService = class TimetableEntryService {
    timetableEntryModel;
    academicYearModel;
    classModel;
    subjectModel;
    teacherModel;
    roomModel;
    timeSlotModel;
    constructor(timetableEntryModel, academicYearModel, classModel, subjectModel, teacherModel, roomModel, timeSlotModel) {
        this.timetableEntryModel = timetableEntryModel;
        this.academicYearModel = academicYearModel;
        this.classModel = classModel;
        this.subjectModel = subjectModel;
        this.teacherModel = teacherModel;
        this.roomModel = roomModel;
        this.timeSlotModel = timeSlotModel;
    }
    async validateReferences(refs) {
        const lookups = [
            [refs.academicYearId, this.academicYearModel, 'Năm học'],
            [refs.classId, this.classModel, 'Lớp học'],
            [refs.subjectId, this.subjectModel, 'Môn học'],
            [refs.teacherId, this.teacherModel, 'Giáo viên'],
            [refs.timeSlotId, this.timeSlotModel, 'Khung giờ'],
            [refs.roomId, this.roomModel, 'Phòng học'],
        ];
        for (const [id, model, label] of lookups) {
            if (!id)
                continue;
            const exists = await model.exists({ _id: id });
            if (!exists) {
                throw new common_1.BadRequestException(`${label} không tồn tại`);
            }
        }
    }
    async checkConflicts(refs, excludeId) {
        const buildFilter = (extra) => {
            const filter = {
                academicYearId: refs.academicYearId,
                dayOfWeek: refs.dayOfWeek,
                timeSlotId: refs.timeSlotId,
                isActive: true,
                ...extra,
            };
            if (excludeId) {
                filter._id = { $ne: excludeId };
            }
            return filter;
        };
        const classConflict = await this.timetableEntryModel.exists(buildFilter({ classId: refs.classId }));
        if (classConflict) {
            throw new common_1.ConflictException('Lớp học đã được xếp môn khác vào khung giờ này');
        }
        if (refs.teacherId) {
            const teacherConflict = await this.timetableEntryModel.exists(buildFilter({ teacherId: refs.teacherId }));
            if (teacherConflict) {
                throw new common_1.ConflictException('Giáo viên đã được xếp dạy lớp khác vào khung giờ này');
            }
        }
        if (refs.roomId) {
            const roomConflict = await this.timetableEntryModel.exists(buildFilter({ roomId: refs.roomId }));
            if (roomConflict) {
                throw new common_1.ConflictException('Phòng học đã được sử dụng vào khung giờ này');
            }
        }
    }
    async create(createTimetableEntryDto) {
        await this.validateReferences(createTimetableEntryDto);
        await this.checkConflicts(createTimetableEntryDto);
        return this.timetableEntryModel.create(createTimetableEntryDto);
    }
    async findAll(academicYearId) {
        const query = this.timetableEntryModel.find({ isActive: true });
        if (academicYearId) {
            query.where('academicYearId').equals(academicYearId);
        }
        return query
            .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
            .sort({ dayOfWeek: 1, timeSlotId: 1 });
    }
    async findByClass(classId, dayOfWeek) {
        const query = this.timetableEntryModel.find({ classId, isActive: true });
        if (dayOfWeek) {
            query.where('dayOfWeek').equals(dayOfWeek);
        }
        return query
            .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
            .sort({ dayOfWeek: 1, timeSlotId: 1 });
    }
    async findByTeacher(teacherId, dayOfWeek) {
        const query = this.timetableEntryModel.find({ teacherId, isActive: true });
        if (dayOfWeek) {
            query.where('dayOfWeek').equals(dayOfWeek);
        }
        return query
            .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
            .sort({ dayOfWeek: 1, timeSlotId: 1 });
    }
    async findByRoom(roomId, dayOfWeek) {
        const query = this.timetableEntryModel.find({ roomId, isActive: true });
        if (dayOfWeek) {
            query.where('dayOfWeek').equals(dayOfWeek);
        }
        return query
            .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
            .sort({ dayOfWeek: 1, timeSlotId: 1 });
    }
    async findById(id) {
        const entry = await this.timetableEntryModel
            .findById(id)
            .populate('academicYearId classId subjectId teacherId timeSlotId roomId');
        if (!entry) {
            throw new common_1.NotFoundException('Timetable entry not found');
        }
        return entry;
    }
    async update(id, updateTimetableEntryDto) {
        const existing = await this.timetableEntryModel.findOne({
            _id: id,
            isActive: true,
        });
        if (!existing) {
            throw new common_1.NotFoundException('Timetable entry not found');
        }
        const merged = {
            academicYearId: updateTimetableEntryDto.academicYearId ?? String(existing.academicYearId),
            classId: updateTimetableEntryDto.classId ?? String(existing.classId),
            subjectId: updateTimetableEntryDto.subjectId ?? String(existing.subjectId),
            teacherId: updateTimetableEntryDto.teacherId ??
                (existing.teacherId ? String(existing.teacherId) : undefined),
            dayOfWeek: updateTimetableEntryDto.dayOfWeek ?? existing.dayOfWeek,
            timeSlotId: updateTimetableEntryDto.timeSlotId ?? String(existing.timeSlotId),
            roomId: updateTimetableEntryDto.roomId ??
                (existing.roomId ? String(existing.roomId) : undefined),
        };
        await this.validateReferences(merged);
        await this.checkConflicts(merged, id);
        const entry = await this.timetableEntryModel
            .findByIdAndUpdate(id, { ...updateTimetableEntryDto, status: 'DRAFT' }, { new: true })
            .populate('academicYearId classId subjectId teacherId timeSlotId roomId');
        if (!entry) {
            throw new common_1.NotFoundException('Timetable entry not found');
        }
        return entry;
    }
    async publishClass(classId, academicYearId) {
        const classExists = await this.classModel.exists({ _id: classId });
        if (!classExists) {
            throw new common_1.BadRequestException('Lớp học không tồn tại');
        }
        const result = await this.timetableEntryModel.updateMany({ classId, academicYearId, isActive: true }, { status: 'PUBLISHED' });
        return {
            message: 'Đã publish thời khóa biểu',
            modifiedCount: result.modifiedCount,
        };
    }
    async findMyTimetable(teacherId, dayOfWeek) {
        if (!teacherId) {
            throw new common_1.BadRequestException('Tài khoản chưa được liên kết với một giáo viên');
        }
        return this.findByTeacher(teacherId, dayOfWeek);
    }
    async remove(id) {
        const entry = await this.timetableEntryModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!entry) {
            throw new common_1.NotFoundException('Timetable entry not found');
        }
        return { message: 'Timetable entry deleted successfully' };
    }
    async findByAcademicYearAndClass(academicYearId, classId, dayOfWeek) {
        const query = this.timetableEntryModel.find({
            academicYearId,
            classId,
            isActive: true,
        });
        if (dayOfWeek) {
            query.where('dayOfWeek').equals(dayOfWeek);
        }
        return query
            .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
            .sort({ dayOfWeek: 1, timeSlotId: 1 });
    }
};
exports.TimetableEntryService = TimetableEntryService;
exports.TimetableEntryService = TimetableEntryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(timetable_entry_schema_1.TimetableEntry.name)),
    __param(1, (0, mongoose_1.InjectModel)(academic_year_schema_1.AcademicYear.name)),
    __param(2, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(3, (0, mongoose_1.InjectModel)(subject_schema_1.Subject.name)),
    __param(4, (0, mongoose_1.InjectModel)(teacher_schema_1.Teacher.name)),
    __param(5, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __param(6, (0, mongoose_1.InjectModel)(time_slot_schema_1.TimeSlot.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TimetableEntryService);
//# sourceMappingURL=timetable-entry.service.js.map