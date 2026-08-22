import { Model } from 'mongoose';
import { AcademicYear, AcademicYearDocument } from '../../schemas/academic-year.schema';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
export declare class AcademicYearService {
    private academicYearModel;
    constructor(academicYearModel: Model<AcademicYearDocument>);
    create(createAcademicYearDto: CreateAcademicYearDto): Promise<import("mongoose").Document<unknown, {}, AcademicYearDocument, {}, import("mongoose").DefaultSchemaOptions> & AcademicYear & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, AcademicYearDocument, {}, import("mongoose").DefaultSchemaOptions> & AcademicYear & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findBySchool(schoolId: string): Promise<(import("mongoose").Document<unknown, {}, AcademicYearDocument, {}, import("mongoose").DefaultSchemaOptions> & AcademicYear & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, AcademicYearDocument, {}, import("mongoose").DefaultSchemaOptions> & AcademicYear & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateAcademicYearDto: UpdateAcademicYearDto): Promise<import("mongoose").Document<unknown, {}, AcademicYearDocument, {}, import("mongoose").DefaultSchemaOptions> & AcademicYear & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
