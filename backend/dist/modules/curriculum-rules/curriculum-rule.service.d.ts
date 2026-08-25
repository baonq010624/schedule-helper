import { Model } from 'mongoose';
import { CurriculumRule, CurriculumRuleDocument } from '../../schemas/curriculum-rule.schema';
import { AcademicYearDocument } from '../../schemas/academic-year.schema';
import { ClassDocument } from '../../schemas/class.schema';
import { SubjectDocument } from '../../schemas/subject.schema';
import { TimetableEntryDocument } from '../../schemas/timetable-entry.schema';
import { TimeSlotDocument } from '../../schemas/time-slot.schema';
import { CreateCurriculumRuleDto } from './dto/create-curriculum-rule.dto';
import { UpdateCurriculumRuleDto } from './dto/update-curriculum-rule.dto';
export declare class CurriculumRuleService {
    private curriculumRuleModel;
    private academicYearModel;
    private classModel;
    private subjectModel;
    private timetableEntryModel;
    private timeSlotModel;
    constructor(curriculumRuleModel: Model<CurriculumRuleDocument>, academicYearModel: Model<AcademicYearDocument>, classModel: Model<ClassDocument>, subjectModel: Model<SubjectDocument>, timetableEntryModel: Model<TimetableEntryDocument>, timeSlotModel: Model<TimeSlotDocument>);
    private validateReferences;
    create(dto: CreateCurriculumRuleDto): Promise<import("mongoose").Document<unknown, {}, CurriculumRuleDocument, {}, import("mongoose").DefaultSchemaOptions> & CurriculumRule & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(filters: {
        academicYearId?: string;
        classId?: string;
        grade?: number;
        subjectId?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, CurriculumRuleDocument, {}, import("mongoose").DefaultSchemaOptions> & CurriculumRule & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, CurriculumRuleDocument, {}, import("mongoose").DefaultSchemaOptions> & CurriculumRule & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, dto: UpdateCurriculumRuleDto): Promise<import("mongoose").Document<unknown, {}, CurriculumRuleDocument, {}, import("mongoose").DefaultSchemaOptions> & CurriculumRule & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
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
    private getEffectiveRules;
    autoFillClass(classId: string): Promise<{
        createdCount: number;
        remainingDeficits: {
            subjectId: string;
            subjectName: string;
            remaining: number;
        }[];
    }>;
}
