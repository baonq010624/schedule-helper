import { Document } from 'mongoose';
export type SchoolDocument = School & Document;
export declare class School {
    name: string;
    address: string;
    isActive: boolean;
}
export declare const SchoolSchema: import("mongoose").Schema<School, import("mongoose").Model<School, any, any, any, any, any, School>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, School, Document<unknown, {}, School, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<School & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, School, Document<unknown, {}, School, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<School & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string, School, Document<unknown, {}, School, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<School & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, School, Document<unknown, {}, School, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<School & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, School>;
