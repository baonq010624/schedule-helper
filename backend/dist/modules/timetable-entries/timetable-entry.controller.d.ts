import { TimetableEntryService } from './timetable-entry.service';
import { CreateTimetableEntryDto } from './dto/create-timetable-entry.dto';
import { UpdateTimetableEntryDto } from './dto/update-timetable-entry.dto';
export declare class TimetableEntryController {
    private timetableEntryService;
    constructor(timetableEntryService: TimetableEntryService);
    create(createTimetableEntryDto: CreateTimetableEntryDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(academicYearId?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByClass(classId: string, dayOfWeek?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByTeacher(teacherId: string, dayOfWeek?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByRoom(roomId: string, dayOfWeek?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateTimetableEntryDto: UpdateTimetableEntryDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").TimetableEntryDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimetableEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
