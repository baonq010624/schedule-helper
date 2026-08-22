import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimeSlotDocument = TimeSlot & Document;

@Schema({ timestamps: true })
export class TimeSlot {
  @Prop({ required: true })
  session: string; // "MORNING" or "AFTERNOON"

  @Prop({ required: true })
  period: number; // 1, 2, 3, 4, 5 (tiết)

  @Prop({ required: true })
  startTime: string; // "07:00"

  @Prop({ required: true })
  endTime: string; // "07:35"

  @Prop({ enum: ['CLASS', 'BREAK'], default: 'CLASS' })
  type: string;

  @Prop({ required: true })
  order: number; // để sort đúng thứ tự

  @Prop({ default: true })
  isActive: boolean;
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
TimeSlotSchema.index({ session: 1, order: 1 });
