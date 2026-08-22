import { Document } from 'mongoose';
export type RoomDocument = Room & Document;
export declare class Room {
    name: string;
    capacity: number;
    type: string;
    isActive: boolean;
}
export declare const RoomSchema: import("mongoose").Schema<Room, import("mongoose").Model<Room, any, any, any, any, any, Room>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Room, Document<unknown, {}, Room, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    capacity?: import("mongoose").SchemaDefinitionProperty<number, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Room>;
