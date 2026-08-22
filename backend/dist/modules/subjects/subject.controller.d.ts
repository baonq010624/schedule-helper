import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
export declare class SubjectController {
    private subjectService;
    constructor(subjectService: SubjectService);
    create(createSubjectDto: CreateSubjectDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").SubjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").Subject & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(schoolId?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").SubjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").Subject & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").SubjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").Subject & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").SubjectDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").Subject & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
