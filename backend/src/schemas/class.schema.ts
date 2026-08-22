import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClassDocument = Class & Document;

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true, type: Types.ObjectId, ref: 'AcademicYear' })
  academicYearId: Types.ObjectId;

  @Prop({ required: true })
  grade: number; // 1, 2, 3

  @Prop({ required: true })
  name: string; // "1A", "1B", etc.

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  roomId?: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ academicYearId: 1 });
ClassSchema.index({ academicYearId: 1, isActive: 1 });
