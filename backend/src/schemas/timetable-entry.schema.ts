import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TimetableEntryDocument = TimetableEntry & Document;

@Schema({ timestamps: true })
export class TimetableEntry {
  @Prop({ required: true, type: Types.ObjectId, ref: 'AcademicYear' })
  academicYearId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Class' })
  classId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Subject' })
  subjectId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  teacherId?: Types.ObjectId;

  @Prop({
    required: true,
    enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
  })
  dayOfWeek: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'TimeSlot' })
  timeSlotId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  roomId?: Types.ObjectId;

  @Prop()
  note?: string;

  @Prop({ enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' })
  status: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const TimetableEntrySchema = SchemaFactory.createForClass(TimetableEntry);
TimetableEntrySchema.index({ academicYearId: 1, classId: 1 });
TimetableEntrySchema.index({
  academicYearId: 1,
  classId: 1,
  dayOfWeek: 1,
  timeSlotId: 1,
});
TimetableEntrySchema.index({ teacherId: 1, dayOfWeek: 1, timeSlotId: 1 });
TimetableEntrySchema.index({ roomId: 1, dayOfWeek: 1, timeSlotId: 1 });
