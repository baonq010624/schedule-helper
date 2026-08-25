import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurriculumRuleService } from './curriculum-rule.service';
import { CurriculumRuleController } from './curriculum-rule.controller';
import { CurriculumRule, CurriculumRuleSchema } from '../../schemas/curriculum-rule.schema';
import { AcademicYear, AcademicYearSchema } from '../../schemas/academic-year.schema';
import { Class, ClassSchema } from '../../schemas/class.schema';
import { Subject, SubjectSchema } from '../../schemas/subject.schema';
import { TimetableEntry, TimetableEntrySchema } from '../../schemas/timetable-entry.schema';
import { TimeSlot, TimeSlotSchema } from '../../schemas/time-slot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CurriculumRule.name, schema: CurriculumRuleSchema },
      { name: AcademicYear.name, schema: AcademicYearSchema },
      { name: Class.name, schema: ClassSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: TimetableEntry.name, schema: TimetableEntrySchema },
      { name: TimeSlot.name, schema: TimeSlotSchema },
    ]),
  ],
  providers: [CurriculumRuleService],
  controllers: [CurriculumRuleController],
  exports: [CurriculumRuleService],
})
export class CurriculumRuleModule {}
