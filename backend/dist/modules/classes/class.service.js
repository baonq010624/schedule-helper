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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_schema_1 = require("../../schemas/class.schema");
let ClassService = class ClassService {
    classModel;
    constructor(classModel) {
        this.classModel = classModel;
    }
    async create(createClassDto) {
        return this.classModel.create({
            ...createClassDto,
            isActive: true,
        });
    }
    async findAll() {
        return this.classModel
            .find({ isActive: true })
            .populate('academicYearId roomId');
    }
    async findByAcademicYear(academicYearId) {
        return this.classModel
            .find({ academicYearId, isActive: true })
            .populate('academicYearId roomId');
    }
    async findById(id) {
        const cls = await this.classModel
            .findById(id)
            .populate('academicYearId roomId');
        if (!cls) {
            throw new common_1.NotFoundException('Class not found');
        }
        return cls;
    }
    async update(id, updateClassDto) {
        const cls = await this.classModel.findByIdAndUpdate(id, updateClassDto, {
            new: true,
        });
        if (!cls) {
            throw new common_1.NotFoundException('Class not found');
        }
        return cls;
    }
    async remove(id) {
        const cls = await this.classModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!cls) {
            throw new common_1.NotFoundException('Class not found');
        }
        return { message: 'Class deleted successfully' };
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClassService);
//# sourceMappingURL=class.service.js.map