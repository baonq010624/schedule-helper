import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';
import { TimetableEntryService } from '../timetable-entries/timetable-entry.service';
import { ClassDocument } from '../../schemas/class.schema';
import { TeacherDocument } from '../../schemas/teacher.schema';
import { RoomDocument } from '../../schemas/room.schema';
import { TimeSlotDocument } from '../../schemas/time-slot.schema';
export declare class ExportService {
    private timetableEntryService;
    private classModel;
    private teacherModel;
    private roomModel;
    private timeSlotModel;
    constructor(timetableEntryService: TimetableEntryService, classModel: Model<ClassDocument>, teacherModel: Model<TeacherDocument>, roomModel: Model<RoomDocument>, timeSlotModel: Model<TimeSlotDocument>);
    buildMasterWorkbook(academicYearId?: string): Promise<ExcelJS.Workbook>;
    private buildGridWorkbook;
    buildClassWorkbook(classId: string): Promise<ExcelJS.Workbook>;
    buildTeacherWorkbook(teacherId: string): Promise<ExcelJS.Workbook>;
    buildRoomWorkbook(roomId: string): Promise<ExcelJS.Workbook>;
}
