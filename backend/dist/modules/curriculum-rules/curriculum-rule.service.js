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
exports.CurriculumRuleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const curriculum_rule_schema_1 = require("../../schemas/curriculum-rule.schema");
const academic_year_schema_1 = require("../../schemas/academic-year.schema");
const class_schema_1 = require("../../schemas/class.schema");
const subject_schema_1 = require("../../schemas/subject.schema");
const timetable_entry_schema_1 = require("../../schemas/timetable-entry.schema");
const time_slot_schema_1 = require("../../schemas/time-slot.schema");
let CurriculumRuleService = class CurriculumRuleService {
    curriculumRuleModel;
    academicYearModel;
    classModel;
    subjectModel;
    timetableEntryModel;
    timeSlotModel;
    constructor(curriculumRuleModel, academicYearModel, classModel, subjectModel, timetableEntryModel, timeSlotModel) {
        this.curriculumRuleModel = curriculumRuleModel;
        this.academicYearModel = academicYearModel;
        this.classModel = classModel;
        this.subjectModel = subjectModel;
        this.timetableEntryModel = timetableEntryModel;
        this.timeSlotModel = timeSlotModel;
    }
    async validateReferences(dto) {
        if (dto.academicYearId) {
            const exists = await this.academicYearModel.exists({ _id: dto.academicYearId });
            if (!exists)
                throw new common_1.BadRequestException('Năm học không tồn tại');
        }
        if (dto.subjectId) {
            const exists = await this.subjectModel.exists({ _id: dto.subjectId });
            if (!exists)
                throw new common_1.BadRequestException('Môn học không tồn tại');
        }
        if (dto.classId) {
            const exists = await this.classModel.exists({ _id: dto.classId });
            if (!exists)
                throw new common_1.BadRequestException('Lớp học không tồn tại');
        }
    }
    async create(dto) {
        await this.validateReferences(dto);
        return this.curriculumRuleModel.create({ ...dto, isActive: true });
    }
    async findAll(filters) {
        const query = { isActive: true };
        if (filters.academicYearId)
            query.academicYearId = filters.academicYearId;
        if (filters.classId)
            query.classId = filters.classId;
        if (filters.grade !== undefined)
            query.grade = filters.grade;
        if (filters.subjectId)
            query.subjectId = filters.subjectId;
        return this.curriculumRuleModel
            .find(query)
            .populate('academicYearId classId subjectId')
            .sort({ grade: 1 });
    }
    async findById(id) {
        const rule = await this.curriculumRuleModel
            .findById(id)
            .populate('academicYearId classId subjectId');
        if (!rule) {
            throw new common_1.NotFoundException('Curriculum rule not found');
        }
        return rule;
    }
    async update(id, dto) {
        await this.validateReferences(dto);
        const rule = await this.curriculumRuleModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('academicYearId classId subjectId');
        if (!rule) {
            throw new common_1.NotFoundException('Curriculum rule not found');
        }
        return rule;
    }
    async remove(id) {
        const rule = await this.curriculumRuleModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!rule) {
            throw new common_1.NotFoundException('Curriculum rule not found');
        }
        return { message: 'Curriculum rule deleted successfully' };
    }
    async getClassReport(classId) {
        const classDoc = await this.classModel.findById(classId);
        if (!classDoc) {
            throw new common_1.NotFoundException('Class not found');
        }
        const [rulesBySubject, entries] = await Promise.all([
            this.getEffectiveRules(classDoc),
            this.timetableEntryModel.find({ classId, isActive: true }),
        ]);
        const actualBySubject = new Map();
        for (const entry of entries) {
            const key = String(entry.subjectId);
            actualBySubject.set(key, (actualBySubject.get(key) ?? 0) + 1);
        }
        const subjectIds = new Set([...rulesBySubject.keys(), ...actualBySubject.keys()]);
        const subjects = await this.subjectModel.find({ _id: { $in: [...subjectIds] } });
        const subjectById = new Map(subjects.map((s) => [String(s._id), s]));
        const report = [...subjectIds].map((subjectId) => {
            const rule = rulesBySubject.get(subjectId);
            const subject = subjectById.get(subjectId);
            const actual = actualBySubject.get(subjectId) ?? 0;
            const required = rule?.requiredPeriodsPerWeek;
            let status;
            if (required === undefined) {
                status = 'KHÔNG CÓ QUY ĐỊNH';
            }
            else if (actual === required) {
                status = 'ĐẠT';
            }
            else if (actual < required) {
                status = 'THIẾU';
            }
            else {
                status = 'THỪA';
            }
            return {
                subjectId,
                subjectName: subject?.name ?? 'Không xác định',
                subjectCode: subject?.code ?? '',
                required: required ?? null,
                actual,
                status,
                severity: rule?.severity ?? 'INFO',
            };
        });
        return {
            classId: String(classDoc._id),
            className: classDoc.name,
            grade: classDoc.grade,
            subjects: report.sort((a, b) => a.subjectName.localeCompare(b.subjectName)),
        };
    }
    async getEffectiveRules(classDoc) {
        const [gradeRules, classRules] = await Promise.all([
            this.curriculumRuleModel.find({
                academicYearId: classDoc.academicYearId,
                grade: classDoc.grade,
                classId: { $exists: false },
                isActive: true,
            }),
            this.curriculumRuleModel.find({
                academicYearId: classDoc.academicYearId,
                classId: classDoc._id,
                isActive: true,
            }),
        ]);
        const rulesBySubject = new Map();
        for (const rule of gradeRules) {
            rulesBySubject.set(String(rule.subjectId), rule);
        }
        for (const rule of classRules) {
            rulesBySubject.set(String(rule.subjectId), rule);
        }
        return rulesBySubject;
    }
    async autoFillClass(classId) {
        const classDoc = await this.classModel.findById(classId);
        if (!classDoc) {
            throw new common_1.NotFoundException('Class not found');
        }
        const [rulesBySubject, entries, timeSlots] = await Promise.all([
            this.getEffectiveRules(classDoc),
            this.timetableEntryModel.find({ classId, isActive: true }),
            this.timeSlotModel.find({ isActive: true, type: 'CLASS' }).sort({ order: 1 }),
        ]);
        const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
        const deficits = new Map();
        const perDayCount = new Map();
        for (const [subjectId, rule] of rulesBySubject) {
            const actual = entries.filter((e) => String(e.subjectId) === subjectId).length;
            const deficit = rule.requiredPeriodsPerWeek - actual;
            if (deficit > 0)
                deficits.set(subjectId, deficit);
        }
        for (const entry of entries) {
            const key = `${entry.subjectId}|${entry.dayOfWeek}`;
            perDayCount.set(key, (perDayCount.get(key) ?? 0) + 1);
        }
        const occupied = new Set(entries.map((e) => `${e.dayOfWeek}|${e.timeSlotId}`));
        const created = [];
        for (const day of DAYS) {
            for (const slot of timeSlots) {
                if (deficits.size === 0)
                    break;
                const slotKey = `${day}|${slot._id}`;
                if (occupied.has(slotKey))
                    continue;
                const candidate = [...deficits.entries()].find(([subjectId]) => {
                    const rule = rulesBySubject.get(subjectId);
                    const maxPerDay = rule?.maxPeriodsPerDay;
                    if (!maxPerDay)
                        return true;
                    const dayKey = `${subjectId}|${day}`;
                    return (perDayCount.get(dayKey) ?? 0) < maxPerDay;
                });
                if (!candidate)
                    continue;
                const [subjectId] = candidate;
                const conflict = await this.timetableEntryModel.exists({
                    classId,
                    dayOfWeek: day,
                    timeSlotId: slot._id,
                    isActive: true,
                });
                if (conflict)
                    continue;
                const newEntry = await this.timetableEntryModel.create({
                    academicYearId: classDoc.academicYearId,
                    classId,
                    subjectId,
                    dayOfWeek: day,
                    timeSlotId: slot._id,
                    status: 'DRAFT',
                    isActive: true,
                });
                created.push(String(newEntry._id));
                occupied.add(slotKey);
                const dayKey = `${subjectId}|${day}`;
                perDayCount.set(dayKey, (perDayCount.get(dayKey) ?? 0) + 1);
                const remaining = (deficits.get(subjectId) ?? 0) - 1;
                if (remaining <= 0)
                    deficits.delete(subjectId);
                else
                    deficits.set(subjectId, remaining);
            }
        }
        const subjects = await this.subjectModel.find({ _id: { $in: [...deficits.keys()] } });
        const subjectById = new Map(subjects.map((s) => [String(s._id), s]));
        const remainingDeficits = [...deficits.entries()].map(([subjectId, remaining]) => ({
            subjectId,
            subjectName: subjectById.get(subjectId)?.name ?? 'Không xác định',
            remaining,
        }));
        return {
            createdCount: created.length,
            remainingDeficits,
        };
    }
};
exports.CurriculumRuleService = CurriculumRuleService;
exports.CurriculumRuleService = CurriculumRuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(curriculum_rule_schema_1.CurriculumRule.name)),
    __param(1, (0, mongoose_1.InjectModel)(academic_year_schema_1.AcademicYear.name)),
    __param(2, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(3, (0, mongoose_1.InjectModel)(subject_schema_1.Subject.name)),
    __param(4, (0, mongoose_1.InjectModel)(timetable_entry_schema_1.TimetableEntry.name)),
    __param(5, (0, mongoose_1.InjectModel)(time_slot_schema_1.TimeSlot.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CurriculumRuleService);
//# sourceMappingURL=curriculum-rule.service.js.map