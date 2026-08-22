import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSlotService } from './time-slot.service';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlot, TimeSlotSchema } from '../../schemas/time-slot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeSlot.name, schema: TimeSlotSchema }]),
  ],
  providers: [TimeSlotService],
  controllers: [TimeSlotController],
  exports: [TimeSlotService],
})
export class TimeSlotModule {}