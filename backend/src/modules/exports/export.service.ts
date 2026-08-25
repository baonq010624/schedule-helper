import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';
import { TimetableEntryService } from '../timetable-entries/timetable-entry.service';
import { Class, ClassDocument } from '../../schemas/class.schema';
import { Teacher, TeacherDocument } from '../../schemas/teacher.schema';
import { Room, RoomDocument } from '../../schemas/room.schema';
import { TimeSlot, TimeSlotDocument } from '../../schemas/time-slot.schema';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const DAY_LABELS: Record<string, string> = {
  MONDAY: 'Thứ Hai',
  TUESDAY: 'Thứ Ba',
  WEDNESDAY: 'Thứ Tư',
  THURSDAY: 'Thứ Năm',
  FRIDAY: 'Thứ Sáu',
};

@Injectable()
export class ExportService {
  constructor(
    private timetableEntryService: TimetableEntryService,
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(TimeSlot.name) private timeSlotModel: Model<TimeSlotDocument>,
  ) {}

  // Bảng tổng: hàng = ngày/tiết, cột = lớp (nhóm theo khối)
  async buildMasterWorkbook(academicYearId?: string) {
    const [entries, classes, timeSlots] = await Promise.all([
      this.timetableEntryService.findAll(academicYearId),
      this.classModel
        .find({ isActive: true, ...(academicYearId ? { academicYearId } : {}) })
        .sort({ grade: 1, name: 1 }),
      this.timeSlotModel.find({ isActive: true }).sort({ order: 1 }),
    ]);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Bảng Tổng');

    // Header row 1: group by grade
    const headerRow1 = ['', ''];
    const headerRow2 = ['Thứ', 'Tiết'];
    let col = 3;
    const gradeSpans: Array<{ grade: number; start: number; end: number }> = [];
    let currentGrade: number | null = null;
    let spanStart = col;
    for (const cls of classes) {
      if (currentGrade === null) currentGrade = cls.grade;
      if (cls.grade !== currentGrade) {
        gradeSpans.push({ grade: currentGrade, start: spanStart, end: col - 1 });
        currentGrade = cls.grade;
        spanStart = col;
      }
      headerRow2.push(cls.name);
      col++;
    }
    if (currentGrade !== null) {
      gradeSpans.push({ grade: currentGrade, start: spanStart, end: col - 1 });
    }

    sheet.addRow(headerRow1);
    sheet.addRow(headerRow2);
    for (const span of gradeSpans) {
      sheet.mergeCells(1, span.start, 1, span.end);
      sheet.getCell(1, span.start).value = `KHỐI ${span.grade}`;
      sheet.getCell(1, span.start).alignment = { horizontal: 'center' };
    }
    sheet.getRow(1).font = { bold: true };
    sheet.getRow(2).font = { bold: true };

    for (const day of DAYS) {
      const dayStartRow = sheet.rowCount + 1;
      for (const slot of timeSlots) {
        const row: (string | number)[] = [
          DAY_LABELS[day],
          slot.type === 'BREAK' ? 'Nghỉ' : `Tiết ${slot.period}`,
        ];
        for (const cls of classes) {
          const entry = entries.find(
            (e: any) =>
              e.dayOfWeek === day &&
              String(e.timeSlotId?._id) === String(slot._id) &&
              String(e.classId?._id) === String(cls._id),
          );
          row.push(entry ? (entry as any).subjectId?.shortName || (entry as any).subjectId?.name || '' : '');
        }
        sheet.addRow(row);
      }
      const dayEndRow = sheet.rowCount;
      if (dayEndRow > dayStartRow) {
        sheet.mergeCells(dayStartRow, 1, dayEndRow, 1);
      }
    }

    sheet.getColumn(1).width = 12;
    sheet.getColumn(2).width = 10;
    for (let i = 3; i < 3 + classes.length; i++) {
      sheet.getColumn(i).width = 12;
    }
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    return workbook;
  }

  // TKB lớp/giáo viên/phòng: hàng = tiết, cột = thứ
  private async buildGridWorkbook(
    title: string,
    entries: any[],
    timeSlots: any[],
    renderCell: (entry: any) => string,
  ) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(title.substring(0, 31));

    const headerRow = ['Tiết / Giờ', ...DAYS.map((d) => DAY_LABELS[d])];
    sheet.addRow(headerRow);
    sheet.getRow(1).font = { bold: true };

    for (const slot of timeSlots) {
      const row: string[] = [
        slot.type === 'BREAK' ? 'Nghỉ' : `Tiết ${slot.period} (${slot.startTime}-${slot.endTime})`,
      ];
      for (const day of DAYS) {
        const entry = entries.find(
          (e) => e.dayOfWeek === day && String(e.timeSlotId?._id) === String(slot._id),
        );
        row.push(entry ? renderCell(entry) : '');
      }
      sheet.addRow(row);
    }

    sheet.getColumn(1).width = 22;
    for (let i = 2; i <= DAYS.length + 1; i++) sheet.getColumn(i).width = 18;
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.alignment = { wrapText: true, vertical: 'top' };
      });
    });

    return workbook;
  }

  async buildClassWorkbook(classId: string) {
    const classDoc = await this.classModel.findById(classId);
    if (!classDoc) throw new NotFoundException('Class not found');

    const [entries, timeSlots] = await Promise.all([
      this.timetableEntryService.findByClass(classId),
      this.timeSlotModel.find({ isActive: true }).sort({ order: 1 }),
    ]);

    return this.buildGridWorkbook(`TKB ${classDoc.name}`, entries, timeSlots, (e) => {
      const parts = [e.subjectId?.name];
      if (e.teacherId?.name) parts.push(e.teacherId.name);
      if (e.roomId?.name) parts.push(e.roomId.name);
      return parts.filter(Boolean).join('\n');
    });
  }

  async buildTeacherWorkbook(teacherId: string) {
    const teacher = await this.teacherModel.findById(teacherId);
    if (!teacher) throw new NotFoundException('Teacher not found');

    const [entries, timeSlots] = await Promise.all([
      this.timetableEntryService.findByTeacher(teacherId),
      this.timeSlotModel.find({ isActive: true }).sort({ order: 1 }),
    ]);

    return this.buildGridWorkbook(`TKB ${teacher.name}`, entries, timeSlots, (e) => {
      const parts = [e.subjectId?.name, e.classId?.name];
      if (e.roomId?.name) parts.push(e.roomId.name);
      return parts.filter(Boolean).join('\n');
    });
  }

  async buildRoomWorkbook(roomId: string) {
    const room = await this.roomModel.findById(roomId);
    if (!room) throw new NotFoundException('Room not found');

    const [entries, timeSlots] = await Promise.all([
      this.timetableEntryService.findByRoom(roomId),
      this.timeSlotModel.find({ isActive: true }).sort({ order: 1 }),
    ]);

    return this.buildGridWorkbook(`TKB ${room.name}`, entries, timeSlots, (e) => {
      const parts = [e.subjectId?.name, e.classId?.name];
      if (e.teacherId?.name) parts.push(e.teacherId.name);
      return parts.filter(Boolean).join('\n');
    });
  }
}
