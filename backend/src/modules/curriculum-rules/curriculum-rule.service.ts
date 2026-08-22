import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CurriculumRule,
  CurriculumRuleDocument,
} from '../../schemas/curriculum-rule.schema';
import { AcademicYear, AcademicYearDocument } from '../../schemas/academic-year.schema';
import { Class, ClassDocument } from '../../schemas/class.schema';
import { Subject, SubjectDocument } from '../../schemas/subject.schema';
import { TimetableEntry, TimetableEntryDocument } from '../../schemas/timetable-entry.schema';
import { CreateCurriculumRuleDto } from './dto/create-curriculum-rule.dto';
import { UpdateCurriculumRuleDto } from './dto/update-curriculum-rule.dto';

@Injectable()
export class CurriculumRuleService {
  constructor(
    @InjectModel(CurriculumRule.name)
    private curriculumRuleModel: Model<CurriculumRuleDocument>,
    @InjectModel(AcademicYear.name)
    private academicYearModel: Model<AcademicYearDocument>,
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
    @InjectModel(TimetableEntry.name)
    private timetableEntryModel: Model<TimetableEntryDocument>,
  ) {}

  private async validateReferences(dto: {
    academicYearId?: string;
    subjectId?: string;
    classId?: string;
  }) {
    if (dto.academicYearId) {
      const exists = await this.academicYearModel.exists({ _id: dto.academicYearId });
      if (!exists) throw new BadRequestException('Năm học không tồn tại');
    }
    if (dto.subjectId) {
      const exists = await this.subjectModel.exists({ _id: dto.subjectId });
      if (!exists) throw new BadRequestException('Môn học không tồn tại');
    }
    if (dto.classId) {
      const exists = await this.classModel.exists({ _id: dto.classId });
      if (!exists) throw new BadRequestException('Lớp học không tồn tại');
    }
  }

  async create(dto: CreateCurriculumRuleDto) {
    await this.validateReferences(dto);
    return this.curriculumRuleModel.create({ ...dto, isActive: true });
  }

  async findAll(filters: {
    academicYearId?: string;
    classId?: string;
    grade?: number;
    subjectId?: string;
  }) {
    const query: Record<string, unknown> = { isActive: true };
    if (filters.academicYearId) query.academicYearId = filters.academicYearId;
    if (filters.classId) query.classId = filters.classId;
    if (filters.grade !== undefined) query.grade = filters.grade;
    if (filters.subjectId) query.subjectId = filters.subjectId;

    return this.curriculumRuleModel
      .find(query)
      .populate('academicYearId classId subjectId')
      .sort({ grade: 1 });
  }

  async findById(id: string) {
    const rule = await this.curriculumRuleModel
      .findById(id)
      .populate('academicYearId classId subjectId');
    if (!rule) {
      throw new NotFoundException('Curriculum rule not found');
    }
    return rule;
  }

  async update(id: string, dto: UpdateCurriculumRuleDto) {
    await this.validateReferences(dto);
    const rule = await this.curriculumRuleModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('academicYearId classId subjectId');
    if (!rule) {
      throw new NotFoundException('Curriculum rule not found');
    }
    return rule;
  }

  async remove(id: string) {
    const rule = await this.curriculumRuleModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!rule) {
      throw new NotFoundException('Curriculum rule not found');
    }
    return { message: 'Curriculum rule deleted successfully' };
  }

  // Đếm số tiết đã xếp cho từng môn của một lớp và so sánh với CurriculumRule áp dụng
  async getClassReport(classId: string) {
    const classDoc = await this.classModel.findById(classId);
    if (!classDoc) {
      throw new NotFoundException('Class not found');
    }

    const [gradeRules, classRules, entries] = await Promise.all([
      this.curriculumRuleModel
        .find({
          academicYearId: classDoc.academicYearId,
          grade: classDoc.grade,
          classId: { $exists: false },
          isActive: true,
        })
        .populate('subjectId'),
      this.curriculumRuleModel
        .find({
          academicYearId: classDoc.academicYearId,
          classId: classDoc._id,
          isActive: true,
        })
        .populate('subjectId'),
      this.timetableEntryModel.find({ classId, isActive: true }),
    ]);

    // Class-specific rules override grade-level rules for the same subject
    const rulesBySubject = new Map<string, (typeof gradeRules)[number]>();
    for (const rule of gradeRules) {
      rulesBySubject.set(String(rule.subjectId?._id ?? rule.subjectId), rule);
    }
    for (const rule of classRules) {
      rulesBySubject.set(String(rule.subjectId?._id ?? rule.subjectId), rule);
    }

    const actualBySubject = new Map<string, number>();
    for (const entry of entries) {
      const key = String(entry.subjectId);
      actualBySubject.set(key, (actualBySubject.get(key) ?? 0) + 1);
    }

    const subjectIds = new Set([...rulesBySubject.keys(), ...actualBySubject.keys()]);
    const subjects = await this.subjectModel.find({ _id: { $in: [...subjectIds] } });
    const subjectById = new Map(subjects.map((s) => [String(s._id), s]));

    const report = [...subjectIds].map((subjectId) => {
      const rule = rulesBySubject.get(subjectId);
      const subject = subjectById.get(subjectId);
      const actual = actualBySubject.get(subjectId) ?? 0;
      const required = rule?.requiredPeriodsPerWeek;

      let status: 'ĐẠT' | 'THIẾU' | 'THỪA' | 'KHÔNG CÓ QUY ĐỊNH';
      if (required === undefined) {
        status = 'KHÔNG CÓ QUY ĐỊNH';
      } else if (actual === required) {
        status = 'ĐẠT';
      } else if (actual < required) {
        status = 'THIẾU';
      } else {
        status = 'THỪA';
      }

      return {
        subjectId,
        subjectName: subject?.name ?? 'Không xác định',
        subjectCode: subject?.code ?? '',
        required: required ?? null,
        actual,
        status,
        severity: rule?.severity ?? 'INFO',
      };
    });

    return {
      classId: String(classDoc._id),
      className: classDoc.name,
      grade: classDoc.grade,
      subjects: report.sort((a, b) => a.subjectName.localeCompare(b.subjectName)),
    };
  }
}
