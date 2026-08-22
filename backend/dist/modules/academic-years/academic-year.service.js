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
exports.AcademicYearService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const academic_year_schema_1 = require("../../schemas/academic-year.schema");
let AcademicYearService = class AcademicYearService {
    academicYearModel;
    constructor(academicYearModel) {
        this.academicYearModel = academicYearModel;
    }
    async create(createAcademicYearDto) {
        const academicYear = await this.academicYearModel.create({
            ...createAcademicYearDto,
            isActive: true,
        });
        return academicYear;
    }
    async findAll() {
        return this.academicYearModel.find({ isActive: true }).populate('schoolId');
    }
    async findBySchool(schoolId) {
        return this.academicYearModel
            .find({ schoolId, isActive: true })
            .populate('schoolId');
    }
    async findById(id) {
        const academicYear = await this.academicYearModel
            .findById(id)
            .populate('schoolId');
        if (!academicYear) {
            throw new common_1.NotFoundException('Academic year not found');
        }
        return academicYear;
    }
    async update(id, updateAcademicYearDto) {
        const academicYear = await this.academicYearModel.findByIdAndUpdate(id, updateAcademicYearDto, { new: true });
        if (!academicYear) {
            throw new common_1.NotFoundException('Academic year not found');
        }
        return academicYear;
    }
    async remove(id) {
        const academicYear = await this.academicYearModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!academicYear) {
            throw new common_1.NotFoundException('Academic year not found');
        }
        return { message: 'Academic year deleted successfully' };
    }
};
exports.AcademicYearService = AcademicYearService;
exports.AcademicYearService = AcademicYearService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(academic_year_schema_1.AcademicYear.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AcademicYearService);
//# sourceMappingURL=academic-year.service.js.map