import { Document, Types } from 'mongoose';
export type ClassDocument = Class & Document;
export declare class Class {
    academicYearId: Types.ObjectId;
    grade: number;
    name: string;
    roomId?: Types.ObjectId;
    isActive: boolean;
}
export declare const ClassSchema: import("mongoose").Schema<Class, import("mongoose").Model<Class, any, any, any, any, any, Class>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Class, Document<unknown, {}, Class, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    academicYearId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Class, Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    grade?: import("mongoose").SchemaDefinitionProperty<number, Class, Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Class, Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    roomId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Class, Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Class, Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Class>;
