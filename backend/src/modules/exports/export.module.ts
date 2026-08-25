import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { TimetableEntryModule } from '../timetable-entries/timetable-entry.module';
import { Class, ClassSchema } from '../../schemas/class.schema';
import { Teacher, TeacherSchema } from '../../schemas/teacher.schema';
import { Room, RoomSchema } from '../../schemas/room.schema';
import { TimeSlot, TimeSlotSchema } from '../../schemas/time-slot.schema';

@Module({
  imports: [
    TimetableEntryModule,
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Room.name, schema: RoomSchema },
      { name: TimeSlot.name, schema: TimeSlotSchema },
    ]),
  ],
  providers: [ExportService],
  controllers: [ExportController],
})
export class ExportModule {}
