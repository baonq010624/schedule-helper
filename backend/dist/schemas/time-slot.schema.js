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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotSchema = exports.TimeSlot = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let TimeSlot = class TimeSlot {
    session;
    period;
    startTime;
    endTime;
    type;
    order;
    isActive;
};
exports.TimeSlot = TimeSlot;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TimeSlot.prototype, "session", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TimeSlot.prototype, "period", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TimeSlot.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TimeSlot.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['CLASS', 'BREAK'], default: 'CLASS' }),
    __metadata("design:type", String)
], TimeSlot.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TimeSlot.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], TimeSlot.prototype, "isActive", void 0);
exports.TimeSlot = TimeSlot = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TimeSlot);
exports.TimeSlotSchema = mongoose_1.SchemaFactory.createForClass(TimeSlot);
exports.TimeSlotSchema.index({ session: 1, order: 1 });
//# sourceMappingURL=time-slot.schema.js.map