import { Model } from 'mongoose';
import { Room, RoomDocument } from '../../schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomService {
    private roomModel;
    constructor(roomModel: Model<RoomDocument>);
    create(createRoomDto: CreateRoomDto): Promise<import("mongoose").Document<unknown, {}, RoomDocument, {}, import("mongoose").DefaultSchemaOptions> & Room & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, RoomDocument, {}, import("mongoose").DefaultSchemaOptions> & Room & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, RoomDocument, {}, import("mongoose").DefaultSchemaOptions> & Room & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByName(name: string): Promise<(import("mongoose").Document<unknown, {}, RoomDocument, {}, import("mongoose").DefaultSchemaOptions> & Room & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<import("mongoose").Document<unknown, {}, RoomDocument, {}, import("mongoose").DefaultSchemaOptions> & Room & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
