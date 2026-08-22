import { Document } from 'mongoose';
export type TimeSlotDocument = TimeSlot & Document;
export declare class TimeSlot {
    session: string;
    period: number;
    startTime: string;
    endTime: string;
    type: string;
    order: number;
    isActive: boolean;
}
export declare const TimeSlotSchema: import("mongoose").Schema<TimeSlot, import("mongoose").Model<TimeSlot, any, any, any, any, any, TimeSlot>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TimeSlot, Document<unknown, {}, TimeSlot, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TimeSlot & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    session?: import("mongoose").SchemaDefinitionProperty<string, TimeSlot, Document<unknown, {}, TimeSlot, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimeSlot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    period?: import("mongoose").SchemaDefinitionProperty<number, TimeSlot, Document<unknown, {}, TimeSlot, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimeSlot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    startTime?: import("mongoose").SchemaDefinitionProperty<string, TimeSlot, Document<unknown, {}, TimeSlot, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimeSlot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    endTime?: import("mongoose").SchemaDefinitionProperty<string, TimeSlot, Document<unknown, {}, TimeSlot, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimeSlot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, TimeSlot, Document<unknown, {}, TimeSlot, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimeSlot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    order?: import("mongoose").SchemaDefinitionProperty<number, TimeSlot, Document<unknown, {}, TimeSlot, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimeSlot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, TimeSlot, Document<unknown, {}, TimeSlot, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimeSlot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, TimeSlot>;
