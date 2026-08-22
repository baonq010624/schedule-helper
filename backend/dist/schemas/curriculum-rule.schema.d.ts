import { Document, Types } from 'mongoose';
export type CurriculumRuleDocument = CurriculumRule & Document;
export declare class CurriculumRule {
    academicYearId: Types.ObjectId;
    grade?: number;
    classId?: Types.ObjectId;
    subjectId: Types.ObjectId;
    requiredPeriodsPerWeek: number;
    minPeriodsPerDay?: number;
    maxPeriodsPerDay?: number;
    isRequired: boolean;
    severity: string;
    isActive: boolean;
}
export declare const CurriculumRuleSchema: import("mongoose").Schema<CurriculumRule, import("mongoose").Model<CurriculumRule, any, any, any, any, any, CurriculumRule>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CurriculumRule, Document<unknown, {}, CurriculumRule, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    academicYearId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    grade?: import("mongoose").SchemaDefinitionProperty<number | undefined, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    classId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    subjectId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    requiredPeriodsPerWeek?: import("mongoose").SchemaDefinitionProperty<number, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    minPeriodsPerDay?: import("mongoose").SchemaDefinitionProperty<number | undefined, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    maxPeriodsPerDay?: import("mongoose").SchemaDefinitionProperty<number | undefined, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isRequired?: import("mongoose").SchemaDefinitionProperty<boolean, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    severity?: import("mongoose").SchemaDefinitionProperty<string, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, CurriculumRule, Document<unknown, {}, CurriculumRule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CurriculumRule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, CurriculumRule>;
