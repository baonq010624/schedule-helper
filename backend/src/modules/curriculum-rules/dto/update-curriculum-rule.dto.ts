import { PartialType } from '@nestjs/mapped-types';
import { CreateCurriculumRuleDto } from './create-curriculum-rule.dto';

export class UpdateCurriculumRuleDto extends PartialType(CreateCurriculumRuleDto) {}
