"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriculumRuleModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const curriculum_rule_service_1 = require("./curriculum-rule.service");
const curriculum_rule_controller_1 = require("./curriculum-rule.controller");
const curriculum_rule_schema_1 = require("../../schemas/curriculum-rule.schema");
const academic_year_schema_1 = require("../../schemas/academic-year.schema");
const class_schema_1 = require("../../schemas/class.schema");
const subject_schema_1 = require("../../schemas/subject.schema");
const timetable_entry_schema_1 = require("../../schemas/timetable-entry.schema");
let CurriculumRuleModule = class CurriculumRuleModule {
};
exports.CurriculumRuleModule = CurriculumRuleModule;
exports.CurriculumRuleModule = CurriculumRuleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: curriculum_rule_schema_1.CurriculumRule.name, schema: curriculum_rule_schema_1.CurriculumRuleSchema },
                { name: academic_year_schema_1.AcademicYear.name, schema: academic_year_schema_1.AcademicYearSchema },
                { name: class_schema_1.Class.name, schema: class_schema_1.ClassSchema },
                { name: subject_schema_1.Subject.name, schema: subject_schema_1.SubjectSchema },
                { name: timetable_entry_schema_1.TimetableEntry.name, schema: timetable_entry_schema_1.TimetableEntrySchema },
            ]),
        ],
        providers: [curriculum_rule_service_1.CurriculumRuleService],
        controllers: [curriculum_rule_controller_1.CurriculumRuleController],
        exports: [curriculum_rule_service_1.CurriculumRuleService],
    })
], CurriculumRuleModule);
//# sourceMappingURL=curriculum-rule.module.js.map