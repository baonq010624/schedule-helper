import { Model } from 'mongoose';
import { Class, ClassDocument } from '../../schemas/class.schema';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
export declare class ClassService {
    private classModel;
    constructor(classModel: Model<ClassDocument>);
    create(createClassDto: CreateClassDto): Promise<import("mongoose").Document<unknown, {}, ClassDocument, {}, import("mongoose").DefaultSchemaOptions> & Class & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, ClassDocument, {}, import("mongoose").DefaultSchemaOptions> & Class & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByAcademicYear(academicYearId: string): Promise<(import("mongoose").Document<unknown, {}, ClassDocument, {}, import("mongoose").DefaultSchemaOptions> & Class & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, ClassDocument, {}, import("mongoose").DefaultSchemaOptions> & Class & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateClassDto: UpdateClassDto): Promise<import("mongoose").Document<unknown, {}, ClassDocument, {}, import("mongoose").DefaultSchemaOptions> & Class & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
