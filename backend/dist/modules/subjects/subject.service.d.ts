import { Model } from 'mongoose';
import { Subject, SubjectDocument } from '../../schemas/subject.schema';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
export declare class SubjectService {
    private subjectModel;
    constructor(subjectModel: Model<SubjectDocument>);
    create(createSubjectDto: CreateSubjectDto): Promise<import("mongoose").Document<unknown, {}, SubjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Subject & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, SubjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Subject & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, SubjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Subject & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByCode(code: string): Promise<(import("mongoose").Document<unknown, {}, SubjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Subject & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<import("mongoose").Document<unknown, {}, SubjectDocument, {}, import("mongoose").DefaultSchemaOptions> & Subject & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
