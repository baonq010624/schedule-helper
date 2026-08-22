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
exports.TimeSlotService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const time_slot_schema_1 = require("../../schemas/time-slot.schema");
let TimeSlotService = class TimeSlotService {
    timeSlotModel;
    constructor(timeSlotModel) {
        this.timeSlotModel = timeSlotModel;
    }
    async create(createTimeSlotDto) {
        return this.timeSlotModel.create({
            ...createTimeSlotDto,
            isActive: true,
        });
    }
    async findAll() {
        return this.timeSlotModel.find({ isActive: true }).sort({ order: 1 });
    }
    async findBySession(session) {
        return this.timeSlotModel
            .find({ session, isActive: true })
            .sort({ order: 1 });
    }
    async findById(id) {
        const timeSlot = await this.timeSlotModel.findById(id);
        if (!timeSlot) {
            throw new common_1.NotFoundException('Time slot not found');
        }
        return timeSlot;
    }
    async update(id, updateTimeSlotDto) {
        const timeSlot = await this.timeSlotModel.findByIdAndUpdate(id, updateTimeSlotDto, { new: true });
        if (!timeSlot) {
            throw new common_1.NotFoundException('Time slot not found');
        }
        return timeSlot;
    }
    async remove(id) {
        const timeSlot = await this.timeSlotModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!timeSlot) {
            throw new common_1.NotFoundException('Time slot not found');
        }
        return { message: 'Time slot deleted successfully' };
    }
};
exports.TimeSlotService = TimeSlotService;
exports.TimeSlotService = TimeSlotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(time_slot_schema_1.TimeSlot.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TimeSlotService);
//# sourceMappingURL=time-slot.service.js.map