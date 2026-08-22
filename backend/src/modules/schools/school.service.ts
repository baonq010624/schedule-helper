import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School, SchoolDocument } from '../../schemas/school.schema';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto) {
    const school = await this.schoolModel.create({
      ...createSchoolDto,
      isActive: true,
    });
    return school;
  }

  async findAll() {
    return this.schoolModel.find({ isActive: true });
  }

  async findById(id: string) {
    const school = await this.schoolModel.findById(id);
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    const school = await this.schoolModel.findByIdAndUpdate(
      id,
      updateSchoolDto,
      { new: true },
    );
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }

  async remove(id: string) {
    const school = await this.schoolModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return { message: 'School deleted successfully' };
  }
}
