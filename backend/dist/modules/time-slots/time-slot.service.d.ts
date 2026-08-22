import { Model } from 'mongoose';
import { TimeSlot, TimeSlotDocument } from '../../schemas/time-slot.schema';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
export declare class TimeSlotService {
    private timeSlotModel;
    constructor(timeSlotModel: Model<TimeSlotDocument>);
    create(createTimeSlotDto: CreateTimeSlotDto): Promise<import("mongoose").Document<unknown, {}, TimeSlotDocument, {}, import("mongoose").DefaultSchemaOptions> & TimeSlot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, TimeSlotDocument, {}, import("mongoose").DefaultSchemaOptions> & TimeSlot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findBySession(session: string): Promise<(import("mongoose").Document<unknown, {}, TimeSlotDocument, {}, import("mongoose").DefaultSchemaOptions> & TimeSlot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, TimeSlotDocument, {}, import("mongoose").DefaultSchemaOptions> & TimeSlot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateTimeSlotDto: UpdateTimeSlotDto): Promise<import("mongoose").Document<unknown, {}, TimeSlotDocument, {}, import("mongoose").DefaultSchemaOptions> & TimeSlot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
