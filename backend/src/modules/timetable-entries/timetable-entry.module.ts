import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimetableEntryService } from './timetable-entry.service';
import { TimetableEntryController } from './timetable-entry.controller';
import {
  TimetableEntry,
  TimetableEntrySchema,
  AcademicYear,
  AcademicYearSchema,
  Class,
  ClassSchema,
  Subject,
  SubjectSchema,
  Teacher,
  TeacherSchema,
  Room,
  RoomSchema,
  TimeSlot,
  TimeSlotSchema,
} from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimetableEntry.name, schema: TimetableEntrySchema },
      { name: AcademicYear.name, schema: AcademicYearSchema },
      { name: Class.name, schema: ClassSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Room.name, schema: RoomSchema },
      { name: TimeSlot.name, schema: TimeSlotSchema },
    ]),
  ],
  providers: [TimetableEntryService],
  controllers: [TimetableEntryController],
  exports: [TimetableEntryService],
})
export class TimetableEntryModule {}
