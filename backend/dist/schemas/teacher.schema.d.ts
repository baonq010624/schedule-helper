import { Document } from 'mongoose';
export type TeacherDocument = Teacher & Document;
export declare class Teacher {
    name: string;
    code: string;
    email: string;
    department: string;
    isActive: boolean;
}
export declare const TeacherSchema: import("mongoose").Schema<Teacher, import("mongoose").Model<Teacher, any, any, any, any, any, Teacher>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Teacher, Document<unknown, {}, Teacher, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    code?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    department?: import("mongoose").SchemaDefinitionProperty<string, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Teacher, Document<unknown, {}, Teacher, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Teacher & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Teacher>;
