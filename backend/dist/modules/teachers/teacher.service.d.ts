import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from '../../schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeacherService {
    private teacherModel;
    constructor(teacherModel: Model<TeacherDocument>);
    create(createTeacherDto: CreateTeacherDto): Promise<import("mongoose").Document<unknown, {}, TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByCode(code: string): Promise<(import("mongoose").Document<unknown, {}, TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    findByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<import("mongoose").Document<unknown, {}, TeacherDocument, {}, import("mongoose").DefaultSchemaOptions> & Teacher & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
