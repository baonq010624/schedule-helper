import { Document, Types } from 'mongoose';
export type SubjectDocument = Subject & Document;
export declare class Subject {
    schoolId?: Types.ObjectId;
    code: string;
    name: string;
    shortName: string;
    isActive: boolean;
}
export declare const SubjectSchema: import("mongoose").Schema<Subject, import("mongoose").Model<Subject, any, any, any, any, any, Subject>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subject, Document<unknown, {}, Subject, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Subject & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    schoolId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Subject, Document<unknown, {}, Subject, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    code?: import("mongoose").SchemaDefinitionProperty<string, Subject, Document<unknown, {}, Subject, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Subject, Document<unknown, {}, Subject, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    shortName?: import("mongoose").SchemaDefinitionProperty<string, Subject, Document<unknown, {}, Subject, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Subject, Document<unknown, {}, Subject, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Subject>;
