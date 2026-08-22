"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCurriculumRuleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_curriculum_rule_dto_1 = require("./create-curriculum-rule.dto");
class UpdateCurriculumRuleDto extends (0, mapped_types_1.PartialType)(create_curriculum_rule_dto_1.CreateCurriculumRuleDto) {
}
exports.UpdateCurriculumRuleDto = UpdateCurriculumRuleDto;
//# sourceMappingURL=update-curriculum-rule.dto.js.map