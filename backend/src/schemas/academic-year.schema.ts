import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { School } from './school.schema';

export type AcademicYearDocument = AcademicYear & Document;

@Schema({ timestamps: true })
export class AcademicYear {
  @Prop({ required: true, type: Types.ObjectId, ref: 'School' })
  schoolId: Types.ObjectId;

  @Prop({ required: true })
  name: string; // e.g., "2026-2027"

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: false })
  isActive: boolean;
}

export const AcademicYearSchema = SchemaFactory.createForClass(AcademicYear);
AcademicYearSchema.index({ schoolId: 1, isActive: 1 });
