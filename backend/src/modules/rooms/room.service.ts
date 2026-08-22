import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from '../../schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    return this.roomModel.create({
      ...createRoomDto,
      isActive: true,
    });
  }

  async findAll() {
    return this.roomModel.find({ isActive: true });
  }

  async findById(id: string) {
    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async findByName(name: string) {
    return this.roomModel.findOne({ name, isActive: true });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomModel.findByIdAndUpdate(
      id,
      updateRoomDto,
      { new: true },
    );
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async remove(id: string) {
    const room = await this.roomModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return { message: 'Room deleted successfully' };
  }
}