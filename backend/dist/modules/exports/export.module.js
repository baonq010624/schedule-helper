"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const export_service_1 = require("./export.service");
const export_controller_1 = require("./export.controller");
const timetable_entry_module_1 = require("../timetable-entries/timetable-entry.module");
const class_schema_1 = require("../../schemas/class.schema");
const teacher_schema_1 = require("../../schemas/teacher.schema");
const room_schema_1 = require("../../schemas/room.schema");
const time_slot_schema_1 = require("../../schemas/time-slot.schema");
let ExportModule = class ExportModule {
};
exports.ExportModule = ExportModule;
exports.ExportModule = ExportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            timetable_entry_module_1.TimetableEntryModule,
            mongoose_1.MongooseModule.forFeature([
                { name: class_schema_1.Class.name, schema: class_schema_1.ClassSchema },
                { name: teacher_schema_1.Teacher.name, schema: teacher_schema_1.TeacherSchema },
                { name: room_schema_1.Room.name, schema: room_schema_1.RoomSchema },
                { name: time_slot_schema_1.TimeSlot.name, schema: time_slot_schema_1.TimeSlotSchema },
            ]),
        ],
        providers: [export_service_1.ExportService],
        controllers: [export_controller_1.ExportController],
    })
], ExportModule);
//# sourceMappingURL=export.module.js.map