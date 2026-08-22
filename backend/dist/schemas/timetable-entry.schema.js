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
exports.TimetableEntrySchema = exports.TimetableEntry = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TimetableEntry = class TimetableEntry {
    academicYearId;
    classId;
    subjectId;
    teacherId;
    dayOfWeek;
    timeSlotId;
    roomId;
    note;
    status;
    isActive;
};
exports.TimetableEntry = TimetableEntry;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'AcademicYear' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TimetableEntry.prototype, "academicYearId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'Class' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TimetableEntry.prototype, "classId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'Subject' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TimetableEntry.prototype, "subjectId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Teacher' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TimetableEntry.prototype, "teacherId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    }),
    __metadata("design:type", String)
], TimetableEntry.prototype, "dayOfWeek", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'TimeSlot' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TimetableEntry.prototype, "timeSlotId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Room' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TimetableEntry.prototype, "roomId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TimetableEntry.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' }),
    __metadata("design:type", String)
], TimetableEntry.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], TimetableEntry.prototype, "isActive", void 0);
exports.TimetableEntry = TimetableEntry = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TimetableEntry);
exports.TimetableEntrySchema = mongoose_1.SchemaFactory.createForClass(TimetableEntry);
exports.TimetableEntrySchema.index({ academicYearId: 1, classId: 1 });
exports.TimetableEntrySchema.index({
    academicYearId: 1,
    classId: 1,
    dayOfWeek: 1,
    timeSlotId: 1,
});
exports.TimetableEntrySchema.index({ teacherId: 1, dayOfWeek: 1, timeSlotId: 1 });
exports.TimetableEntrySchema.index({ roomId: 1, dayOfWeek: 1, timeSlotId: 1 });
//# sourceMappingURL=timetable-entry.schema.js.map