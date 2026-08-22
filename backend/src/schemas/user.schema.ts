import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    enum: ['ADMIN', 'SCHEDULER', 'TEACHER', 'VIEWER'],
    default: 'VIEWER',
  })
  role: string;

  // Links a TEACHER-role account to its Teacher record so it can see its own timetable
  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  teacherId?: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
