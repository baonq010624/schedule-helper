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
exports.CurriculumRuleController = void 0;
const common_1 = require("@nestjs/common");
const curriculum_rule_service_1 = require("./curriculum-rule.service");
const create_curriculum_rule_dto_1 = require("./dto/create-curriculum-rule.dto");
const update_curriculum_rule_dto_1 = require("./dto/update-curriculum-rule.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let CurriculumRuleController = class CurriculumRuleController {
    curriculumRuleService;
    constructor(curriculumRuleService) {
        this.curriculumRuleService = curriculumRuleService;
    }
    async create(dto) {
        return this.curriculumRuleService.create(dto);
    }
    async findAll(academicYearId, classId, grade, subjectId) {
        return this.curriculumRuleService.findAll({
            academicYearId,
            classId,
            grade: grade !== undefined ? Number(grade) : undefined,
            subjectId,
        });
    }
    async getClassReport(classId) {
        return this.curriculumRuleService.getClassReport(classId);
    }
    async autoFill(classId) {
        return this.curriculumRuleService.autoFillClass(classId);
    }
    async findById(id) {
        return this.curriculumRuleService.findById(id);
    }
    async update(id, dto) {
        return this.curriculumRuleService.update(id, dto);
    }
    async remove(id) {
        return this.curriculumRuleService.remove(id);
    }
};
exports.CurriculumRuleController = CurriculumRuleController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'SCHEDULER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_curriculum_rule_dto_1.CreateCurriculumRuleDto]),
    __metadata("design:returntype", Promise)
], CurriculumRuleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('academicYearId')),
    __param(1, (0, common_1.Query)('classId')),
    __param(2, (0, common_1.Query)('grade')),
    __param(3, (0, common_1.Query)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], CurriculumRuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('report/:classId'),
    __param(0, (0, common_1.Param)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurriculumRuleController.prototype, "getClassReport", null);
__decorate([
    (0, common_1.Post)('auto-fill/:classId'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SCHEDULER'),
    __param(0, (0, common_1.Param)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurriculumRuleController.prototype, "autoFill", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurriculumRuleController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SCHEDULER'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_curriculum_rule_dto_1.UpdateCurriculumRuleDto]),
    __metadata("design:returntype", Promise)
], CurriculumRuleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SCHEDULER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurriculumRuleController.prototype, "remove", null);
exports.CurriculumRuleController = CurriculumRuleController = __decorate([
    (0, common_1.Controller)('curriculum-rules'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [curriculum_rule_service_1.CurriculumRuleService])
], CurriculumRuleController);
//# sourceMappingURL=curriculum-rule.controller.js.map