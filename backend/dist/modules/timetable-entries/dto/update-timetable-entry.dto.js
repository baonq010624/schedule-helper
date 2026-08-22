"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTimetableEntryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_timetable_entry_dto_1 = require("./create-timetable-entry.dto");
class UpdateTimetableEntryDto extends (0, mapped_types_1.PartialType)(create_timetable_entry_dto_1.CreateTimetableEntryDto) {
}
exports.UpdateTimetableEntryDto = UpdateTimetableEntryDto;
//# sourceMappingURL=update-timetable-entry.dto.js.map