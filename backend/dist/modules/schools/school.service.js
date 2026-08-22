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
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const school_schema_1 = require("../../schemas/school.schema");
let SchoolService = class SchoolService {
    schoolModel;
    constructor(schoolModel) {
        this.schoolModel = schoolModel;
    }
    async create(createSchoolDto) {
        const school = await this.schoolModel.create({
            ...createSchoolDto,
            isActive: true,
        });
        return school;
    }
    async findAll() {
        return this.schoolModel.find({ isActive: true });
    }
    async findById(id) {
        const school = await this.schoolModel.findById(id);
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        return school;
    }
    async update(id, updateSchoolDto) {
        const school = await this.schoolModel.findByIdAndUpdate(id, updateSchoolDto, { new: true });
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        return school;
    }
    async remove(id) {
        const school = await this.schoolModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        return { message: 'School deleted successfully' };
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(school_schema_1.School.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SchoolService);
//# sourceMappingURL=school.service.js.map