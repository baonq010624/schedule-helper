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
exports.CurriculumRuleSchema = exports.CurriculumRule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CurriculumRule = class CurriculumRule {
    academicYearId;
    grade;
    classId;
    subjectId;
    requiredPeriodsPerWeek;
    minPeriodsPerDay;
    maxPeriodsPerDay;
    isRequired;
    severity;
    isActive;
};
exports.CurriculumRule = CurriculumRule;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'AcademicYear' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CurriculumRule.prototype, "academicYearId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CurriculumRule.prototype, "grade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Class' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CurriculumRule.prototype, "classId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'Subject' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CurriculumRule.prototype, "subjectId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CurriculumRule.prototype, "requiredPeriodsPerWeek", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CurriculumRule.prototype, "minPeriodsPerDay", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CurriculumRule.prototype, "maxPeriodsPerDay", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], CurriculumRule.prototype, "isRequired", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['ERROR', 'WARNING', 'INFO'], default: 'WARNING' }),
    __metadata("design:type", String)
], CurriculumRule.prototype, "severity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], CurriculumRule.prototype, "isActive", void 0);
exports.CurriculumRule = CurriculumRule = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CurriculumRule);
exports.CurriculumRuleSchema = mongoose_1.SchemaFactory.createForClass(CurriculumRule);
exports.CurriculumRuleSchema.index({ academicYearId: 1, subjectId: 1, grade: 1 });
exports.CurriculumRuleSchema.index({ academicYearId: 1, subjectId: 1, classId: 1 });
//# sourceMappingURL=curriculum-rule.schema.js.map