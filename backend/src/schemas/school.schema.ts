import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchoolDocument = School & Document;

@Schema({ timestamps: true })
export class School {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
