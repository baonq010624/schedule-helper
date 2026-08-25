import { CurriculumRuleService } from './curriculum-rule.service';
import { CreateCurriculumRuleDto } from './dto/create-curriculum-rule.dto';
import { UpdateCurriculumRuleDto } from './dto/update-curriculum-rule.dto';
export declare class CurriculumRuleController {
    private curriculumRuleService;
    constructor(curriculumRuleService: CurriculumRuleService);
    create(dto: CreateCurriculumRuleDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").CurriculumRuleDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CurriculumRule & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(academicYearId?: string, classId?: string, grade?: string, subjectId?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").CurriculumRuleDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CurriculumRule & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getClassReport(classId: string): Promise<{
        classId: string;
        className: string;
        grade: number;
        subjects: {
            subjectId: string;
            subjectName: string;
            subjectCode: string;
            required: number | null;
            actual: number;
            status: "ĐẠT" | "THIẾU" | "THỪA" | "KHÔNG CÓ QUY ĐỊNH";
            severity: string;
        }[];
    }>;
    autoFill(classId: string): Promise<{
        createdCount: number;
        remainingDeficits: {
            subjectId: string;
            subjectName: string;
            remaining: number;
        }[];
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").CurriculumRuleDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CurriculumRule & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, dto: UpdateCurriculumRuleDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").CurriculumRuleDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CurriculumRule & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
