import { Document, Types } from 'mongoose';
export type TimetableEntryDocument = TimetableEntry & Document;
export declare class TimetableEntry {
    academicYearId: Types.ObjectId;
    classId: Types.ObjectId;
    subjectId: Types.ObjectId;
    teacherId?: Types.ObjectId;
    dayOfWeek: string;
    timeSlotId: Types.ObjectId;
    roomId?: Types.ObjectId;
    note?: string;
    status: string;
    isActive: boolean;
}
export declare const TimetableEntrySchema: import("mongoose").Schema<TimetableEntry, import("mongoose").Model<TimetableEntry, any, any, any, any, any, TimetableEntry>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TimetableEntry, Document<unknown, {}, TimetableEntry, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    academicYearId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    classId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    subjectId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    teacherId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    dayOfWeek?: import("mongoose").SchemaDefinitionProperty<string, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    timeSlotId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    roomId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    note?: import("mongoose").SchemaDefinitionProperty<string | undefined, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, TimetableEntry, Document<unknown, {}, TimetableEntry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimetableEntry & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, TimetableEntry>;
