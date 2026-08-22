import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string; // "GV001", etc.

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  department: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
