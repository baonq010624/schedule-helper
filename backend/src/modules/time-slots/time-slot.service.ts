import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeSlot, TimeSlotDocument } from '../../schemas/time-slot.schema';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectModel(TimeSlot.name)
    private timeSlotModel: Model<TimeSlotDocument>,
  ) {}

  async create(createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotModel.create({
      ...createTimeSlotDto,
      isActive: true,
    });
  }

  async findAll() {
    return this.timeSlotModel.find({ isActive: true }).sort({ order: 1 });
  }

  async findBySession(session: string) {
    return this.timeSlotModel
      .find({ session, isActive: true })
      .sort({ order: 1 });
  }

  async findById(id: string) {
    const timeSlot = await this.timeSlotModel.findById(id);
    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }
    return timeSlot;
  }

  async update(id: string, updateTimeSlotDto: UpdateTimeSlotDto) {
    const timeSlot = await this.timeSlotModel.findByIdAndUpdate(
      id,
      updateTimeSlotDto,
      { new: true },
    );
    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }
    return timeSlot;
  }

  async remove(id: string) {
    const timeSlot = await this.timeSlotModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }
    return { message: 'Time slot deleted successfully' };
  }
}