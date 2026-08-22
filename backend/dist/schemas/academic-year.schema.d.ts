import { Document, Types } from 'mongoose';
export type AcademicYearDocument = AcademicYear & Document;
export declare class AcademicYear {
    schoolId: Types.ObjectId;
    name: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}
export declare const AcademicYearSchema: import("mongoose").Schema<AcademicYear, import("mongoose").Model<AcademicYear, any, any, any, any, any, AcademicYear>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AcademicYear, Document<unknown, {}, AcademicYear, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AcademicYear & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    schoolId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AcademicYear, Document<unknown, {}, AcademicYear, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AcademicYear & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, AcademicYear, Document<unknown, {}, AcademicYear, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AcademicYear & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, AcademicYear, Document<unknown, {}, AcademicYear, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AcademicYear & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, AcademicYear, Document<unknown, {}, AcademicYear, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AcademicYear & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AcademicYear, Document<unknown, {}, AcademicYear, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AcademicYear & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, AcademicYear>;
