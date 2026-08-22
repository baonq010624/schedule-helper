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
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const teacher_schema_1 = require("../../schemas/teacher.schema");
let TeacherService = class TeacherService {
    teacherModel;
    constructor(teacherModel) {
        this.teacherModel = teacherModel;
    }
    async create(createTeacherDto) {
        return this.teacherModel.create({
            ...createTeacherDto,
            isActive: true,
        });
    }
    async findAll() {
        return this.teacherModel.find({ isActive: true });
    }
    async findById(id) {
        const teacher = await this.teacherModel.findById(id);
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return teacher;
    }
    async findByCode(code) {
        return this.teacherModel.findOne({ code, isActive: true });
    }
    async findByEmail(email) {
        return this.teacherModel.findOne({ email, isActive: true });
    }
    async update(id, updateTeacherDto) {
        const teacher = await this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true });
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return teacher;
    }
    async remove(id) {
        const teacher = await this.teacherModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return { message: 'Teacher deleted successfully' };
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(teacher_schema_1.Teacher.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map