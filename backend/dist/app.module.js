"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const Joi = __importStar(require("joi"));
const auth_module_1 = require("./modules/auth/auth.module");
const school_module_1 = require("./modules/schools/school.module");
const academic_year_module_1 = require("./modules/academic-years/academic-year.module");
const class_module_1 = require("./modules/classes/class.module");
const subject_module_1 = require("./modules/subjects/subject.module");
const teacher_module_1 = require("./modules/teachers/teacher.module");
const room_module_1 = require("./modules/rooms/room.module");
const time_slot_module_1 = require("./modules/time-slots/time-slot.module");
const timetable_entry_module_1 = require("./modules/timetable-entries/timetable-entry.module");
const schemas_1 = require("./schemas");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                validationSchema: Joi.object({
                    MONGODB_URI: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRATION: Joi.string().required(),
                    PORT: Joi.number().default(3000),
                    NODE_ENV: Joi.string().default('development'),
                }),
            }),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: 'School', schema: schemas_1.SchoolSchema },
                { name: 'AcademicYear', schema: schemas_1.AcademicYearSchema },
                { name: 'Class', schema: schemas_1.ClassSchema },
                { name: 'Subject', schema: schemas_1.SubjectSchema },
                { name: 'Teacher', schema: schemas_1.TeacherSchema },
                { name: 'Room', schema: schemas_1.RoomSchema },
                { name: 'TimeSlot', schema: schemas_1.TimeSlotSchema },
                { name: 'TimetableEntry', schema: schemas_1.TimetableEntrySchema },
            ]),
            auth_module_1.AuthModule,
            school_module_1.SchoolModule,
            academic_year_module_1.AcademicYearModule,
            class_module_1.ClassModule,
            subject_module_1.SubjectModule,
            teacher_module_1.TeacherModule,
            room_module_1.RoomModule,
            time_slot_module_1.TimeSlotModule,
            timetable_entry_module_1.TimetableEntryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map