import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AcademicYear,
  AcademicYearDocument,
} from '../../schemas/academic-year.schema';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';

@Injectable()
export class AcademicYearService {
  constructor(
    @InjectModel(AcademicYear.name)
    private academicYearModel: Model<AcademicYearDocument>,
  ) {}

  async create(createAcademicYearDto: CreateAcademicYearDto) {
    const academicYear = await this.academicYearModel.create({
      ...createAcademicYearDto,
      isActive: true,
    });
    return academicYear;
  }

  async findAll() {
    return this.academicYearModel.find({ isActive: true }).populate('schoolId');
  }

  async findBySchool(schoolId: string) {
    return this.academicYearModel
      .find({ schoolId, isActive: true })
      .populate('schoolId');
  }

  async findById(id: string) {
    const academicYear = await this.academicYearModel
      .findById(id)
      .populate('schoolId');
    if (!academicYear) {
      throw new NotFoundException('Academic year not found');
    }
    return academicYear;
  }

  async update(id: string, updateAcademicYearDto: UpdateAcademicYearDto) {
    const academicYear = await this.academicYearModel.findByIdAndUpdate(
      id,
      updateAcademicYearDto,
      { new: true },
    );
    if (!academicYear) {
      throw new NotFoundException('Academic year not found');
    }
    return academicYear;
  }

  async remove(id: string) {
    const academicYear = await this.academicYearModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!academicYear) {
      throw new NotFoundException('Academic year not found');
    }
    return { message: 'Academic year deleted successfully' };
  }
}
