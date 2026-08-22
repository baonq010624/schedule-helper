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
exports.SubjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subject_schema_1 = require("../../schemas/subject.schema");
let SubjectService = class SubjectService {
    subjectModel;
    constructor(subjectModel) {
        this.subjectModel = subjectModel;
    }
    async create(createSubjectDto) {
        return this.subjectModel.create({
            ...createSubjectDto,
            isActive: true,
        });
    }
    async findAll() {
        return this.subjectModel.find({ isActive: true });
    }
    async findById(id) {
        const subject = await this.subjectModel.findById(id);
        if (!subject) {
            throw new common_1.NotFoundException('Subject not found');
        }
        return subject;
    }
    async findByCode(code) {
        return this.subjectModel.findOne({ code, isActive: true });
    }
    async update(id, updateSubjectDto) {
        const subject = await this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, { new: true });
        if (!subject) {
            throw new common_1.NotFoundException('Subject not found');
        }
        return subject;
    }
    async remove(id) {
        const subject = await this.subjectModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!subject) {
            throw new common_1.NotFoundException('Subject not found');
        }
        return { message: 'Subject deleted successfully' };
    }
};
exports.SubjectService = SubjectService;
exports.SubjectService = SubjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subject_schema_1.Subject.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubjectService);
//# sourceMappingURL=subject.service.js.map