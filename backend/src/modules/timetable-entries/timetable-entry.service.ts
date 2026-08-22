import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TimetableEntry,
  TimetableEntryDocument,
} from '../../schemas/timetable-entry.schema';
import { AcademicYear, AcademicYearDocument } from '../../schemas/academic-year.schema';
import { Class, ClassDocument } from '../../schemas/class.schema';
import { Subject, SubjectDocument } from '../../schemas/subject.schema';
import { Teacher, TeacherDocument } from '../../schemas/teacher.schema';
import { Room, RoomDocument } from '../../schemas/room.schema';
import { TimeSlot, TimeSlotDocument } from '../../schemas/time-slot.schema';
import { CreateTimetableEntryDto } from './dto/create-timetable-entry.dto';
import { UpdateTimetableEntryDto } from './dto/update-timetable-entry.dto';

interface EntryRefs {
  academicYearId?: string;
  classId?: string;
  subjectId?: string;
  teacherId?: string;
  dayOfWeek?: string;
  timeSlotId?: string;
  roomId?: string;
}

@Injectable()
export class TimetableEntryService {
  constructor(
    @InjectModel(TimetableEntry.name)
    private timetableEntryModel: Model<TimetableEntryDocument>,
    @InjectModel(AcademicYear.name)
    private academicYearModel: Model<AcademicYearDocument>,
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(TimeSlot.name) private timeSlotModel: Model<TimeSlotDocument>,
  ) {}

  // Ensure every referenced id actually exists before it gets stored on an entry
  private async validateReferences(refs: EntryRefs) {
    const lookups: Array<[string | undefined, Model<any>, string]> = [
      [refs.academicYearId, this.academicYearModel, 'Năm học'],
      [refs.classId, this.classModel, 'Lớp học'],
      [refs.subjectId, this.subjectModel, 'Môn học'],
      [refs.teacherId, this.teacherModel, 'Giáo viên'],
      [refs.timeSlotId, this.timeSlotModel, 'Khung giờ'],
      [refs.roomId, this.roomModel, 'Phòng học'],
    ];

    for (const [id, model, label] of lookups) {
      if (!id) continue;
      const exists = await model.exists({ _id: id });
      if (!exists) {
        throw new BadRequestException(`${label} không tồn tại`);
      }
    }
  }

  // Reject entries that would double-book the same class, teacher or room in one slot
  private async checkConflicts(refs: EntryRefs, excludeId?: string) {
    const buildFilter = (extra: Record<string, unknown>) => {
      const filter: Record<string, unknown> = {
        academicYearId: refs.academicYearId,
        dayOfWeek: refs.dayOfWeek,
        timeSlotId: refs.timeSlotId,
        isActive: true,
        ...extra,
      };
      if (excludeId) {
        filter._id = { $ne: excludeId };
      }
      return filter;
    };

    const classConflict = await this.timetableEntryModel.exists(
      buildFilter({ classId: refs.classId }),
    );
    if (classConflict) {
      throw new ConflictException(
        'Lớp học đã được xếp môn khác vào khung giờ này',
      );
    }

    if (refs.teacherId) {
      const teacherConflict = await this.timetableEntryModel.exists(
        buildFilter({ teacherId: refs.teacherId }),
      );
      if (teacherConflict) {
        throw new ConflictException(
          'Giáo viên đã được xếp dạy lớp khác vào khung giờ này',
        );
      }
    }

    if (refs.roomId) {
      const roomConflict = await this.timetableEntryModel.exists(
        buildFilter({ roomId: refs.roomId }),
      );
      if (roomConflict) {
        throw new ConflictException(
          'Phòng học đã được sử dụng vào khung giờ này',
        );
      }
    }
  }

  async create(createTimetableEntryDto: CreateTimetableEntryDto) {
    await this.validateReferences(createTimetableEntryDto);
    await this.checkConflicts(createTimetableEntryDto);
    return this.timetableEntryModel.create(createTimetableEntryDto);
  }

  // Bảng tổng (summary table) - all timetable entries with populated references
  async findAll(academicYearId?: string) {
    const query = this.timetableEntryModel.find({ isActive: true });

    if (academicYearId) {
      query.where('academicYearId').equals(academicYearId);
    }

    return query
      .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
      .sort({ dayOfWeek: 1, timeSlotId: 1 });
  }

  // TKB lớp (class timetable) - entries for a specific class
  async findByClass(classId: string, dayOfWeek?: string) {
    const query = this.timetableEntryModel.find({ classId, isActive: true });

    if (dayOfWeek) {
      query.where('dayOfWeek').equals(dayOfWeek);
    }

    return query
      .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
      .sort({ dayOfWeek: 1, timeSlotId: 1 });
  }

  // TKB giáo viên (teacher timetable) - entries for a specific teacher
  async findByTeacher(teacherId: string, dayOfWeek?: string) {
    const query = this.timetableEntryModel.find({ teacherId, isActive: true });

    if (dayOfWeek) {
      query.where('dayOfWeek').equals(dayOfWeek);
    }

    return query
      .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
      .sort({ dayOfWeek: 1, timeSlotId: 1 });
  }

  // TKB phòng (room timetable) - entries for a specific room
  async findByRoom(roomId: string, dayOfWeek?: string) {
    const query = this.timetableEntryModel.find({ roomId, isActive: true });

    if (dayOfWeek) {
      query.where('dayOfWeek').equals(dayOfWeek);
    }

    return query
      .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
      .sort({ dayOfWeek: 1, timeSlotId: 1 });
  }

  // Get single entry by ID
  async findById(id: string) {
    const entry = await this.timetableEntryModel
      .findById(id)
      .populate('academicYearId classId subjectId teacherId timeSlotId roomId');
    if (!entry) {
      throw new NotFoundException('Timetable entry not found');
    }
    return entry;
  }

  // Update entry
  async update(id: string, updateTimetableEntryDto: UpdateTimetableEntryDto) {
    const existing = await this.timetableEntryModel.findOne({
      _id: id,
      isActive: true,
    });
    if (!existing) {
      throw new NotFoundException('Timetable entry not found');
    }

    const merged: EntryRefs = {
      academicYearId:
        updateTimetableEntryDto.academicYearId ?? String(existing.academicYearId),
      classId: updateTimetableEntryDto.classId ?? String(existing.classId),
      subjectId: updateTimetableEntryDto.subjectId ?? String(existing.subjectId),
      teacherId:
        updateTimetableEntryDto.teacherId ??
        (existing.teacherId ? String(existing.teacherId) : undefined),
      dayOfWeek: updateTimetableEntryDto.dayOfWeek ?? existing.dayOfWeek,
      timeSlotId: updateTimetableEntryDto.timeSlotId ?? String(existing.timeSlotId),
      roomId:
        updateTimetableEntryDto.roomId ??
        (existing.roomId ? String(existing.roomId) : undefined),
    };

    await this.validateReferences(merged);
    await this.checkConflicts(merged, id);

    const entry = await this.timetableEntryModel
      .findByIdAndUpdate(id, updateTimetableEntryDto, { new: true })
      .populate('academicYearId classId subjectId teacherId timeSlotId roomId');
    if (!entry) {
      throw new NotFoundException('Timetable entry not found');
    }
    return entry;
  }

  // Remove entry (soft delete, consistent with other modules)
  async remove(id: string) {
    const entry = await this.timetableEntryModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!entry) {
      throw new NotFoundException('Timetable entry not found');
    }
    return { message: 'Timetable entry deleted successfully' };
  }

  // Get entries by academic year and class
  async findByAcademicYearAndClass(
    academicYearId: string,
    classId: string,
    dayOfWeek?: string,
  ) {
    const query = this.timetableEntryModel.find({
      academicYearId,
      classId,
      isActive: true,
    });

    if (dayOfWeek) {
      query.where('dayOfWeek').equals(dayOfWeek);
    }

    return query
      .populate('academicYearId classId subjectId teacherId timeSlotId roomId')
      .sort({ dayOfWeek: 1, timeSlotId: 1 });
  }
}