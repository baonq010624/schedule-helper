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
exports.TimeSlotController = void 0;
const common_1 = require("@nestjs/common");
const time_slot_service_1 = require("./time-slot.service");
const create_time_slot_dto_1 = require("./dto/create-time-slot.dto");
const update_time_slot_dto_1 = require("./dto/update-time-slot.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let TimeSlotController = class TimeSlotController {
    timeSlotService;
    constructor(timeSlotService) {
        this.timeSlotService = timeSlotService;
    }
    async create(createTimeSlotDto) {
        return this.timeSlotService.create(createTimeSlotDto);
    }
    async findAll(session) {
        if (session) {
            return this.timeSlotService.findBySession(session);
        }
        return this.timeSlotService.findAll();
    }
    async findById(id) {
        return this.timeSlotService.findById(id);
    }
    async update(id, updateTimeSlotDto) {
        return this.timeSlotService.update(id, updateTimeSlotDto);
    }
    async remove(id) {
        return this.timeSlotService.remove(id);
    }
};
exports.TimeSlotController = TimeSlotController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_time_slot_dto_1.CreateTimeSlotDto]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('session')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_time_slot_dto_1.UpdateTimeSlotDto]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "remove", null);
exports.TimeSlotController = TimeSlotController = __decorate([
    (0, common_1.Controller)('time-slots'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [time_slot_service_1.TimeSlotService])
], TimeSlotController);
//# sourceMappingURL=time-slot.controller.js.map