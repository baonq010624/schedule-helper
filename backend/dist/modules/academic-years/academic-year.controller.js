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
exports.AcademicYearController = void 0;
const common_1 = require("@nestjs/common");
const academic_year_service_1 = require("./academic-year.service");
const create_academic_year_dto_1 = require("./dto/create-academic-year.dto");
const update_academic_year_dto_1 = require("./dto/update-academic-year.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let AcademicYearController = class AcademicYearController {
    academicYearService;
    constructor(academicYearService) {
        this.academicYearService = academicYearService;
    }
    async create(createAcademicYearDto) {
        return this.academicYearService.create(createAcademicYearDto);
    }
    async findAll(schoolId) {
        if (schoolId) {
            return this.academicYearService.findBySchool(schoolId);
        }
        return this.academicYearService.findAll();
    }
    async findById(id) {
        return this.academicYearService.findById(id);
    }
    async update(id, updateAcademicYearDto) {
        return this.academicYearService.update(id, updateAcademicYearDto);
    }
    async remove(id) {
        return this.academicYearService.remove(id);
    }
};
exports.AcademicYearController = AcademicYearController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_academic_year_dto_1.CreateAcademicYearDto]),
    __metadata("design:returntype", Promise)
], AcademicYearController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicYearController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicYearController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_academic_year_dto_1.UpdateAcademicYearDto]),
    __metadata("design:returntype", Promise)
], AcademicYearController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicYearController.prototype, "remove", null);
exports.AcademicYearController = AcademicYearController = __decorate([
    (0, common_1.Controller)('academic-years'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [academic_year_service_1.AcademicYearService])
], AcademicYearController);
//# sourceMappingURL=academic-year.controller.js.map