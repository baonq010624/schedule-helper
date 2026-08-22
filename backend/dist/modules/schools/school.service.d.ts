import { Model } from 'mongoose';
import { School, SchoolDocument } from '../../schemas/school.schema';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
export declare class SchoolService {
    private schoolModel;
    constructor(schoolModel: Model<SchoolDocument>);
    create(createSchoolDto: CreateSchoolDto): Promise<import("mongoose").Document<unknown, {}, SchoolDocument, {}, import("mongoose").DefaultSchemaOptions> & School & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, SchoolDocument, {}, import("mongoose").DefaultSchemaOptions> & School & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, SchoolDocument, {}, import("mongoose").DefaultSchemaOptions> & School & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<import("mongoose").Document<unknown, {}, SchoolDocument, {}, import("mongoose").DefaultSchemaOptions> & School & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
