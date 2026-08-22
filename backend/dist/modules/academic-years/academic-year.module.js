"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYearModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const academic_year_service_1 = require("./academic-year.service");
const academic_year_controller_1 = require("./academic-year.controller");
const academic_year_schema_1 = require("../../schemas/academic-year.schema");
let AcademicYearModule = class AcademicYearModule {
};
exports.AcademicYearModule = AcademicYearModule;
exports.AcademicYearModule = AcademicYearModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: academic_year_schema_1.AcademicYear.name, schema: academic_year_schema_1.AcademicYearSchema },
            ]),
        ],
        providers: [academic_year_service_1.AcademicYearService],
        controllers: [academic_year_controller_1.AcademicYearController],
        exports: [academic_year_service_1.AcademicYearService],
    })
], AcademicYearModule);
//# sourceMappingURL=academic-year.module.js.map