import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from '../../schemas/subject.schema';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return this.subjectModel.create({
      ...createSubjectDto,
      isActive: true,
    });
  }

  async findAll() {
    return this.subjectModel.find({ isActive: true });
  }

  async findById(id: string) {
    const subject = await this.subjectModel.findById(id);
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }

  async findByCode(code: string) {
    return this.subjectModel.findOne({ code, isActive: true });
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.subjectModel.findByIdAndUpdate(
      id,
      updateSubjectDto,
      { new: true },
    );
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }

  async remove(id: string) {
    const subject = await this.subjectModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return { message: 'Subject deleted successfully' };
  }
}