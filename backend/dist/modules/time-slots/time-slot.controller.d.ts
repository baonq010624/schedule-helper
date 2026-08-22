import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
export declare class TimeSlotController {
    private timeSlotService;
    constructor(timeSlotService: TimeSlotService);
    create(createTimeSlotDto: CreateTimeSlotDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").TimeSlotDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimeSlot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(session?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").TimeSlotDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimeSlot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").TimeSlotDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimeSlot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateTimeSlotDto: UpdateTimeSlotDto): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").TimeSlotDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TimeSlot & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
