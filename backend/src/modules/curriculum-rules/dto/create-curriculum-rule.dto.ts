import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsIn,
  Min,
} from 'class-validator';

export class CreateCurriculumRuleDto {
  @IsString()
  @IsNotEmpty()
  academicYearId: string;

  @IsOptional()
  @IsNumber()
  grade?: number;

  @IsOptional()
  @IsString()
  classId?: string;

  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @IsNumber()
  @Min(0)
  requiredPeriodsPerWeek: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPeriodsPerDay?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPeriodsPerDay?: number;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsIn(['ERROR', 'WARNING', 'INFO'])
  severity?: string;
}
