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
const mongoose = __importStar(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const bcrypt = __importStar(require("bcrypt"));
const schemas_1 = require("./schemas");
dotenv.config();
async function seed() {
    try {
        console.log('🌱 Starting seed...');
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/schedule_db';
        const conn = await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');
        const connection = conn.connection;
        await connection.collection('schools').deleteMany({}).catch(() => null);
        await connection.collection('academicyears').deleteMany({}).catch(() => null);
        await connection.collection('classes').deleteMany({}).catch(() => null);
        await connection.collection('subjects').deleteMany({}).catch(() => null);
        await connection.collection('teachers').deleteMany({}).catch(() => null);
        await connection.collection('rooms').deleteMany({}).catch(() => null);
        await connection.collection('timeslots').deleteMany({}).catch(() => null);
        await connection.collection('users').deleteMany({}).catch(() => null);
        await connection.collection('curriculumrules').deleteMany({}).catch(() => null);
        const schoolModel = connection.model('School', schemas_1.SchoolSchema);
        const school = await schoolModel.create({
            name: 'Trường Tiểu học ABC',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            isActive: true,
        });
        console.log('✅ Created school:', school.name);
        const academicYearModel = connection.model('AcademicYear', schemas_1.AcademicYearSchema);
        const academicYear = await academicYearModel.create({
            schoolId: school._id,
            name: '2026-2027',
            startDate: new Date('2026-08-15'),
            endDate: new Date('2027-06-30'),
            isActive: true,
        });
        console.log('✅ Created academic year:', academicYear.name);
        const classModel = connection.model('Class', schemas_1.ClassSchema);
        const classes = await classModel.insertMany([
            {
                academicYearId: academicYear._id,
                grade: 1,
                name: '1A',
                isActive: true,
            },
            {
                academicYearId: academicYear._id,
                grade: 1,
                name: '1B',
                isActive: true,
            },
            {
                academicYearId: academicYear._id,
                grade: 1,
                name: '1C',
                isActive: true,
            },
        ]);
        console.log(`✅ Created ${classes.length} classes`);
        const subjectModel = connection.model('Subject', schemas_1.SubjectSchema);
        const subjects = await subjectModel.insertMany([
            { schoolId: school._id, code: 'TOAN', name: 'Toán', shortName: 'T' },
            { schoolId: school._id, code: 'TV', name: 'Tiếng Việt', shortName: 'TV' },
            { schoolId: school._id, code: 'TA', name: 'Tiếng Anh', shortName: 'TA' },
            { schoolId: school._id, code: 'GDTC', name: 'Giáo dục thể chất', shortName: 'GDTC' },
            { schoolId: school._id, code: 'TNXH', name: 'Tự nhiên - Xã hội', shortName: 'TNXH' },
        ]);
        console.log(`✅ Created ${subjects.length} subjects`);
        const teacherModel = connection.model('Teacher', schemas_1.TeacherSchema);
        const teachers = await teacherModel.insertMany([
            { schoolId: school._id, code: 'GV001', name: 'Cô Thúy', email: 'thuy@school.com', department: 'Math' },
            { schoolId: school._id, code: 'GV002', name: 'Cô Minh', email: 'minh@school.com', department: 'Vietnamese' },
            { schoolId: school._id, code: 'GV003', name: 'Cô Hòa', email: 'hoa@school.com', department: 'English' },
            { schoolId: school._id, code: 'GV004', name: 'Thầy Tuấn', email: 'tuan@school.com', department: 'PE' },
            { schoolId: school._id, code: 'GV005', name: 'Cô Lan', email: 'lan@school.com', department: 'Science' },
        ]);
        console.log(`✅ Created ${teachers.length} teachers`);
        const roomModel = connection.model('Room', schemas_1.RoomSchema);
        const rooms = await roomModel.insertMany([
            { name: 'Phòng 101', capacity: 35, type: 'CLASSROOM' },
            { name: 'Phòng 102', capacity: 35, type: 'CLASSROOM' },
            { name: 'Phòng Tin học', capacity: 25, type: 'LAB' },
            { name: 'Sân thể dục', capacity: 100, type: 'GYM' },
        ]);
        console.log(`✅ Created ${rooms.length} rooms`);
        const timeSlotModel = connection.model('TimeSlot', schemas_1.TimeSlotSchema);
        const timeSlots = await timeSlotModel.insertMany([
            { session: 'MORNING', period: 1, startTime: '07:00', endTime: '07:35', type: 'CLASS', order: 1 },
            { session: 'MORNING', period: 2, startTime: '07:40', endTime: '08:15', type: 'CLASS', order: 2 },
            { session: 'MORNING', period: 3, startTime: '08:20', endTime: '08:55', type: 'CLASS', order: 3 },
            { session: 'MORNING', period: 0, startTime: '08:55', endTime: '09:20', type: 'BREAK', order: 4 },
            { session: 'MORNING', period: 4, startTime: '09:20', endTime: '09:55', type: 'CLASS', order: 5 },
            { session: 'MORNING', period: 5, startTime: '10:00', endTime: '10:35', type: 'CLASS', order: 6 },
            { session: 'AFTERNOON', period: 1, startTime: '13:00', endTime: '13:35', type: 'CLASS', order: 7 },
            { session: 'AFTERNOON', period: 2, startTime: '13:40', endTime: '14:15', type: 'CLASS', order: 8 },
            { session: 'AFTERNOON', period: 0, startTime: '14:15', endTime: '14:35', type: 'BREAK', order: 9 },
            { session: 'AFTERNOON', period: 3, startTime: '14:35', endTime: '15:10', type: 'CLASS', order: 10 },
        ]);
        console.log(`✅ Created ${timeSlots.length} time slots`);
        const curriculumRuleModel = connection.model('CurriculumRule', schemas_1.CurriculumRuleSchema);
        const curriculumRules = await curriculumRuleModel.insertMany([
            { academicYearId: academicYear._id, grade: 1, subjectId: subjects[0]._id, requiredPeriodsPerWeek: 5, isRequired: true, severity: 'ERROR' },
            { academicYearId: academicYear._id, grade: 1, subjectId: subjects[1]._id, requiredPeriodsPerWeek: 10, isRequired: true, severity: 'ERROR' },
            { academicYearId: academicYear._id, grade: 1, subjectId: subjects[2]._id, requiredPeriodsPerWeek: 2, isRequired: false, severity: 'WARNING' },
            { academicYearId: academicYear._id, grade: 1, subjectId: subjects[3]._id, requiredPeriodsPerWeek: 2, isRequired: true, severity: 'WARNING' },
            { academicYearId: academicYear._id, grade: 1, subjectId: subjects[4]._id, requiredPeriodsPerWeek: 2, isRequired: true, severity: 'INFO' },
        ]);
        console.log(`✅ Created ${curriculumRules.length} curriculum rules`);
        const userModel = connection.model('User', schemas_1.UserSchema);
        const passwordHash = await bcrypt.hash('password123', 10);
        const user = await userModel.create({
            email: 'test@test.com',
            passwordHash,
            name: 'Test User',
            role: 'ADMIN',
            isActive: true,
        });
        console.log('✅ Created test user:', user.email, '(password: password123)');
        console.log('✨ Seed completed successfully!');
        await mongoose.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.js.map