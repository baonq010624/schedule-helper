import { AcademicYearService } from './academic-year.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
export declare class AcademicYearController {
    private academicYearService;
    constructor(academicYearService: AcademicYearService);
    create(createAcademicYearDto: CreateAcademicYearDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").AcademicYearDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AcademicYear & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(schoolId?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").AcademicYearDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AcademicYear & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").AcademicYearDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AcademicYear & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateAcademicYearDto: UpdateAcademicYearDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").AcademicYearDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AcademicYear & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
