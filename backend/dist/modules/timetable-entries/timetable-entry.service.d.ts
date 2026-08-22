import { Model } from 'mongoose';
import { TimetableEntry, TimetableEntryDocument } from '../../schemas/timetable-entry.schema';
import { AcademicYearDocument } from '../../schemas/academic-year.schema';
import { ClassDocument } from '../../schemas/class.schema';
import { SubjectDocument } from '../../schemas/subject.schema';
import { TeacherDocument } from '../../schemas/teacher.schema';
import { RoomDocument } from '../../schemas/room.schema';
import { TimeSlotDocument } from '../../schemas/time-slot.schema';
import { CreateTimetableEntryDto } from './dto/create-timetable-entry.dto';
import { UpdateTimetableEntryDto } from './dto/update-timetable-entry.dto';
export declare class TimetableEntryService {
    private timetableEntryModel;
    private academicYearModel;
    private classModel;
    private subjectModel;
    private teacherModel;
    private roomModel;
    private timeSlotModel;
    constructor(timetableEntryModel: Model<TimetableEntryDocument>, academicYearModel: Model<AcademicYearDocument>, classModel: Model<ClassDocument>, subjectModel: Model<SubjectDocument>, teacherModel: Model<TeacherDocument>, roomModel: Model<RoomDocument>, timeSlotModel: Model<TimeSlotDocument>);
    private validateReferences;
    private checkConflicts;
    create(createTimetableEntryDto: CreateTimetableEntryDto): Promise<import("mongoose").Document<unknown, {}, TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(academicYearId?: string): Promise<(import("mongoose").Document<unknown, {}, TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByClass(classId: string, dayOfWeek?: string): Promise<(import("mongoose").Document<unknown, {}, TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByTeacher(teacherId: string, dayOfWeek?: string): Promise<(import("mongoose").Document<unknown, {}, TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByRoom(roomId: string, dayOfWeek?: string): Promise<(import("mongoose").Document<unknown, {}, TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateTimetableEntryDto: UpdateTimetableEntryDto): Promise<import("mongoose").Document<unknown, {}, TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByAcademicYearAndClass(academicYearId: string, classId: string, dayOfWeek?: string): Promise<(import("mongoose").Document<unknown, {}, TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
