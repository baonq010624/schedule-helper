import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import {
  UserSchema,
  SchoolSchema,
  AcademicYearSchema,
  ClassSchema,
  SubjectSchema,
  TeacherSchema,
  RoomSchema,
  TimeSlotSchema,
} from './schemas';

dotenv.config();

async function seed() {
  try {
    console.log('🌱 Starting seed...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/schedule_db';
    const conn = await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const connection = conn.connection;

    // Clear collections
    await connection.collection('schools').deleteMany({}).catch(() => null);
    await connection.collection('academicyears').deleteMany({}).catch(() => null);
    await connection.collection('classes').deleteMany({}).catch(() => null);
    await connection.collection('subjects').deleteMany({}).catch(() => null);
    await connection.collection('teachers').deleteMany({}).catch(() => null);
    await connection.collection('rooms').deleteMany({}).catch(() => null);
    await connection.collection('timeslots').deleteMany({}).catch(() => null);
    await connection.collection('users').deleteMany({}).catch(() => null);

    // Seed School
    const schoolModel = connection.model('School', SchoolSchema);
    const school = await schoolModel.create({
      name: 'Trường Tiểu học ABC',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      isActive: true,
    });
    console.log('✅ Created school:', school.name);

    // Seed AcademicYear
    const academicYearModel = connection.model('AcademicYear', AcademicYearSchema);
    const academicYear = await academicYearModel.create({
      schoolId: school._id,
      name: '2026-2027',
      startDate: new Date('2026-08-15'),
      endDate: new Date('2027-06-30'),
      isActive: true,
    });
    console.log('✅ Created academic year:', academicYear.name);

    // Seed Classes
    const classModel = connection.model('Class', ClassSchema);
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

    // Seed Subjects
    const subjectModel = connection.model('Subject', SubjectSchema);
    const subjects = await subjectModel.insertMany([
      { code: 'TOAN', name: 'Toán', shortName: 'T' },
      { code: 'TV', name: 'Tiếng Việt', shortName: 'TV' },
      { code: 'TA', name: 'Tiếng Anh', shortName: 'TA' },
      { code: 'GDTC', name: 'Giáo dục thể chất', shortName: 'GDTC' },
      { code: 'TNXH', name: 'Tự nhiên - Xã hội', shortName: 'TNXH' },
    ]);
    console.log(`✅ Created ${subjects.length} subjects`);

    // Seed Teachers
    const teacherModel = connection.model('Teacher', TeacherSchema);
    const teachers = await teacherModel.insertMany([
      { code: 'GV001', name: 'Cô Thúy', email: 'thuy@school.com', department: 'Math' },
      { code: 'GV002', name: 'Cô Minh', email: 'minh@school.com', department: 'Vietnamese' },
      { code: 'GV003', name: 'Cô Hòa', email: 'hoa@school.com', department: 'English' },
      { code: 'GV004', name: 'Thầy Tuấn', email: 'tuan@school.com', department: 'PE' },
      { code: 'GV005', name: 'Cô Lan', email: 'lan@school.com', department: 'Science' },
    ]);
    console.log(`✅ Created ${teachers.length} teachers`);

    // Seed Rooms
    const roomModel = connection.model('Room', RoomSchema);
    const rooms = await roomModel.insertMany([
      { name: 'Phòng 101', capacity: 35, type: 'CLASSROOM' },
      { name: 'Phòng 102', capacity: 35, type: 'CLASSROOM' },
      { name: 'Phòng Tin học', capacity: 25, type: 'LAB' },
      { name: 'Sân thể dục', capacity: 100, type: 'GYM' },
    ]);
    console.log(`✅ Created ${rooms.length} rooms`);

    // Seed TimeSlots
    const timeSlotModel = connection.model('TimeSlot', TimeSlotSchema);
    const timeSlots = await timeSlotModel.insertMany([
      // Morning session
      { session: 'MORNING', period: 1, startTime: '07:00', endTime: '07:35', type: 'CLASS', order: 1 },
      { session: 'MORNING', period: 2, startTime: '07:40', endTime: '08:15', type: 'CLASS', order: 2 },
      { session: 'MORNING', period: 3, startTime: '08:20', endTime: '08:55', type: 'CLASS', order: 3 },
      { session: 'MORNING', period: 0, startTime: '08:55', endTime: '09:20', type: 'BREAK', order: 4 },
      { session: 'MORNING', period: 4, startTime: '09:20', endTime: '09:55', type: 'CLASS', order: 5 },
      { session: 'MORNING', period: 5, startTime: '10:00', endTime: '10:35', type: 'CLASS', order: 6 },
      // Afternoon session
      { session: 'AFTERNOON', period: 1, startTime: '13:00', endTime: '13:35', type: 'CLASS', order: 7 },
      { session: 'AFTERNOON', period: 2, startTime: '13:40', endTime: '14:15', type: 'CLASS', order: 8 },
      { session: 'AFTERNOON', period: 0, startTime: '14:15', endTime: '14:35', type: 'BREAK', order: 9 },
      { session: 'AFTERNOON', period: 3, startTime: '14:35', endTime: '15:10', type: 'CLASS', order: 10 },
    ]);
    console.log(`✅ Created ${timeSlots.length} time slots`);

    // Seed test user
    const userModel = connection.model('User', UserSchema);
    const user = await userModel.create({
      email: 'test@test.com',
      passwordHash: 'hashed_password_placeholder', // Will be replaced with bcrypt in auth
      name: 'Test User',
      role: 'ADMIN',
      isActive: true,
    });
    console.log('✅ Created test user:', user.email);

    console.log('✨ Seed completed successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
