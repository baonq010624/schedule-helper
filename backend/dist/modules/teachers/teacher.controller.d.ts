import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeacherController {
    private teacherService;
    constructor(teacherService: TeacherService);
    create(createTeacherDto: CreateTeacherDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(schoolId?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
