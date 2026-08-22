import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CurriculumRuleDocument = CurriculumRule & Document;

@Schema({ timestamps: true })
export class CurriculumRule {
  @Prop({ required: true, type: Types.ObjectId, ref: 'AcademicYear' })
  academicYearId: Types.ObjectId;

  // Applies to every class of this grade unless a class-specific rule overrides it
  @Prop()
  grade?: number;

  // Overrides the grade-level rule for one specific class
  @Prop({ type: Types.ObjectId, ref: 'Class' })
  classId?: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Subject' })
  subjectId: Types.ObjectId;

  @Prop({ required: true })
  requiredPeriodsPerWeek: number;

  @Prop()
  minPeriodsPerDay?: number;

  @Prop()
  maxPeriodsPerDay?: number;

  @Prop({ default: true })
  isRequired: boolean;

  @Prop({ enum: ['ERROR', 'WARNING', 'INFO'], default: 'WARNING' })
  severity: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const CurriculumRuleSchema = SchemaFactory.createForClass(CurriculumRule);
CurriculumRuleSchema.index({ academicYearId: 1, subjectId: 1, grade: 1 });
CurriculumRuleSchema.index({ academicYearId: 1, subjectId: 1, classId: 1 });
