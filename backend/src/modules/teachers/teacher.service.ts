import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from '../../schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    return this.teacherModel.create({
      ...createTeacherDto,
      isActive: true,
    });
  }

  async findAll(schoolId?: string) {
    const query: Record<string, unknown> = { isActive: true };
    if (schoolId) query.schoolId = schoolId;
    return this.teacherModel.find(query);
  }

  async findById(id: string) {
    const teacher = await this.teacherModel.findById(id);
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }

  async findByCode(code: string) {
    return this.teacherModel.findOne({ code, isActive: true });
  }

  async findByEmail(email: string) {
    return this.teacherModel.findOne({ email, isActive: true });
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teacherModel.findByIdAndUpdate(
      id,
      updateTeacherDto,
      { new: true },
    );
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }

  async remove(id: string) {
    const teacher = await this.teacherModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return { message: 'Teacher deleted successfully' };
  }
}