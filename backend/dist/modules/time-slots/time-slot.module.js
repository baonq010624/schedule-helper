"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const time_slot_service_1 = require("./time-slot.service");
const time_slot_controller_1 = require("./time-slot.controller");
const time_slot_schema_1 = require("../../schemas/time-slot.schema");
let TimeSlotModule = class TimeSlotModule {
};
exports.TimeSlotModule = TimeSlotModule;
exports.TimeSlotModule = TimeSlotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: time_slot_schema_1.TimeSlot.name, schema: time_slot_schema_1.TimeSlotSchema }]),
        ],
        providers: [time_slot_service_1.TimeSlotService],
        controllers: [time_slot_controller_1.TimeSlotController],
        exports: [time_slot_service_1.TimeSlotService],
    })
], TimeSlotModule);
//# sourceMappingURL=time-slot.module.js.map