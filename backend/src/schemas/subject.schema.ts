import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema({ timestamps: true })
export class Subject {
  @Prop({ required: true })
  code: string; // "TOAN", "TV", etc.

  @Prop({ required: true })
  name: string; // "Toán", "Tiếng Việt", etc.

  @Prop({ required: true })
  shortName: string; // "T", "TV", etc.

  @Prop({ default: true })
  isActive: boolean;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
SubjectSchema.index({ code: 1 });
