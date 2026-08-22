"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetableEntryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const timetable_entry_service_1 = require("./timetable-entry.service");
const timetable_entry_controller_1 = require("./timetable-entry.controller");
const schemas_1 = require("../../schemas");
let TimetableEntryModule = class TimetableEntryModule {
};
exports.TimetableEntryModule = TimetableEntryModule;
exports.TimetableEntryModule = TimetableEntryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: schemas_1.TimetableEntry.name, schema: schemas_1.TimetableEntrySchema },
                { name: schemas_1.AcademicYear.name, schema: schemas_1.AcademicYearSchema },
                { name: schemas_1.Class.name, schema: schemas_1.ClassSchema },
                { name: schemas_1.Subject.name, schema: schemas_1.SubjectSchema },
                { name: schemas_1.Teacher.name, schema: schemas_1.TeacherSchema },
                { name: schemas_1.Room.name, schema: schemas_1.RoomSchema },
                { name: schemas_1.TimeSlot.name, schema: schemas_1.TimeSlotSchema },
            ]),
        ],
        providers: [timetable_entry_service_1.TimetableEntryService],
        controllers: [timetable_entry_controller_1.TimetableEntryController],
        exports: [timetable_entry_service_1.TimetableEntryService],
    })
], TimetableEntryModule);
//# sourceMappingURL=timetable-entry.module.js.map