import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { AuthModule } from './modules/auth/auth.module';
import { SchoolModule } from './modules/schools/school.module';
import { AcademicYearModule } from './modules/academic-years/academic-year.module';
import { ClassModule } from './modules/classes/class.module';
import { SubjectModule } from './modules/subjects/subject.module';
import { TeacherModule } from './modules/teachers/teacher.module';
import { RoomModule } from './modules/rooms/room.module';
import { TimeSlotModule } from './modules/time-slots/time-slot.module';
import { TimetableEntryModule } from './modules/timetable-entries/timetable-entry.module';
import { CurriculumRuleModule } from './modules/curriculum-rules/curriculum-rule.module';
import {
  UserSchema,
  SchoolSchema,
  AcademicYearSchema,
  ClassSchema,
  SubjectSchema,
  TeacherSchema,
  RoomSchema,
  TimeSlotSchema,
  TimetableEntrySchema,
  CurriculumRuleSchema,
} from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().default('development'),
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: 'School', schema: SchoolSchema },
      { name: 'AcademicYear', schema: AcademicYearSchema },
      { name: 'Class', schema: ClassSchema },
      { name: 'Subject', schema: SubjectSchema },
      { name: 'Teacher', schema: TeacherSchema },
      { name: 'Room', schema: RoomSchema },
      { name: 'TimeSlot', schema: TimeSlotSchema },
      { name: 'TimetableEntry', schema: TimetableEntrySchema },
      { name: 'CurriculumRule', schema: CurriculumRuleSchema },
    ]),
    AuthModule,
    SchoolModule,
    AcademicYearModule,
    ClassModule,
    SubjectModule,
    TeacherModule,
    RoomModule,
    TimeSlotModule,
    TimetableEntryModule,
    CurriculumRuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
