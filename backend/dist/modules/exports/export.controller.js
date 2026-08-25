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
exports.ExportController = void 0;
const common_1 = require("@nestjs/common");
const export_service_1 = require("./export.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ExportController = class ExportController {
    exportService;
    constructor(exportService) {
        this.exportService = exportService;
    }
    async send(res, filename, workbook) {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        await workbook.xlsx.write(res);
        res.end();
    }
    async exportMaster(academicYearId, res) {
        const workbook = await this.exportService.buildMasterWorkbook(academicYearId);
        await this.send(res, 'bang-tong-thoi-khoa-bieu.xlsx', workbook);
    }
    async exportClass(classId, res) {
        const workbook = await this.exportService.buildClassWorkbook(classId);
        await this.send(res, `tkb-lop-${classId}.xlsx`, workbook);
    }
    async exportTeacher(teacherId, res) {
        const workbook = await this.exportService.buildTeacherWorkbook(teacherId);
        await this.send(res, `tkb-giao-vien-${teacherId}.xlsx`, workbook);
    }
    async exportRoom(roomId, res) {
        const workbook = await this.exportService.buildRoomWorkbook(roomId);
        await this.send(res, `tkb-phong-${roomId}.xlsx`, workbook);
    }
};
exports.ExportController = ExportController;
__decorate([
    (0, common_1.Get)('master'),
    __param(0, (0, common_1.Query)('academicYearId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportMaster", null);
__decorate([
    (0, common_1.Get)('class/:classId'),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportClass", null);
__decorate([
    (0, common_1.Get)('teacher/:teacherId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportTeacher", null);
__decorate([
    (0, common_1.Get)('room/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportRoom", null);
exports.ExportController = ExportController = __decorate([
    (0, common_1.Controller)('exports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [export_service_1.ExportService])
], ExportController);
//# sourceMappingURL=export.controller.js.map