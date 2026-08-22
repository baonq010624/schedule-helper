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
exports.TimetableEntryController = void 0;
const common_1 = require("@nestjs/common");
const timetable_entry_service_1 = require("./timetable-entry.service");
const create_timetable_entry_dto_1 = require("./dto/create-timetable-entry.dto");
const update_timetable_entry_dto_1 = require("./dto/update-timetable-entry.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let TimetableEntryController = class TimetableEntryController {
    timetableEntryService;
    constructor(timetableEntryService) {
        this.timetableEntryService = timetableEntryService;
    }
    async create(createTimetableEntryDto) {
        return this.timetableEntryService.create(createTimetableEntryDto);
    }
    async findAll(academicYearId) {
        return this.timetableEntryService.findAll(academicYearId);
    }
    async findByClass(classId, dayOfWeek) {
        return this.timetableEntryService.findByClass(classId, dayOfWeek);
    }
    async findByTeacher(teacherId, dayOfWeek) {
        return this.timetableEntryService.findByTeacher(teacherId, dayOfWeek);
    }
    async findByRoom(roomId, dayOfWeek) {
        return this.timetableEntryService.findByRoom(roomId, dayOfWeek);
    }
    async findById(id) {
        return this.timetableEntryService.findById(id);
    }
    async update(id, updateTimetableEntryDto) {
        return this.timetableEntryService.update(id, updateTimetableEntryDto);
    }
    async remove(id) {
        return this.timetableEntryService.remove(id);
    }
};
exports.TimetableEntryController = TimetableEntryController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'SCHEDULER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_timetable_entry_dto_1.CreateTimetableEntryDto]),
    __metadata("design:returntype", Promise)
], TimetableEntryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimetableEntryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('class/:classId'),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Query)('dayOfWeek')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimetableEntryController.prototype, "findByClass", null);
__decorate([
    (0, common_1.Get)('teacher/:teacherId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __param(1, (0, common_1.Query)('dayOfWeek')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimetableEntryController.prototype, "findByTeacher", null);
__decorate([
    (0, common_1.Get)('room/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Query)('dayOfWeek')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimetableEntryController.prototype, "findByRoom", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimetableEntryController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SCHEDULER'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_timetable_entry_dto_1.UpdateTimetableEntryDto]),
    __metadata("design:returntype", Promise)
], TimetableEntryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SCHEDULER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimetableEntryController.prototype, "remove", null);
exports.TimetableEntryController = TimetableEntryController = __decorate([
    (0, common_1.Controller)('timetable-entries'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [timetable_entry_service_1.TimetableEntryService])
], TimetableEntryController);
//# sourceMappingURL=timetable-entry.controller.js.map