import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
export declare class SchoolController {
    private schoolService;
    constructor(schoolService: SchoolService);
    create(createSchoolDto: CreateSchoolDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").SchoolDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").School & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").SchoolDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").School & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").SchoolDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").School & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").SchoolDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").School & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
