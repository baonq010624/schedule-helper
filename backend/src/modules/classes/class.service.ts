import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, ClassDocument } from '../../schemas/class.schema';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    return this.classModel.create({
      ...createClassDto,
      isActive: true,
    });
  }

  async findAll() {
    return this.classModel
      .find({ isActive: true })
      .populate('academicYearId roomId');
  }

  async findByAcademicYear(academicYearId: string) {
    return this.classModel
      .find({ academicYearId, isActive: true })
      .populate('academicYearId roomId');
  }

  async findById(id: string) {
    const cls = await this.classModel
      .findById(id)
      .populate('academicYearId roomId');
    if (!cls) {
      throw new NotFoundException('Class not found');
    }
    return cls;
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    const cls = await this.classModel.findByIdAndUpdate(id, updateClassDto, {
      new: true,
    });
    if (!cls) {
      throw new NotFoundException('Class not found');
    }
    return cls;
  }

  async remove(id: string) {
    const cls = await this.classModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!cls) {
      throw new NotFoundException('Class not found');
    }
    return { message: 'Class deleted successfully' };
  }
}
