# Phase 1 Implementation Plan - Core MVP

**Date**: 2026-08-17  
**Status**: Approved - Ready for implementation  
**Scope**: Core MVP for Schedule Helper (Hệ thống quản lý thời khóa biểu)

---

## Executive Summary

Xây dựng MVP Schedule Helper với:
- **Bảng tổng interactif** (mô phỏng Excel)
- **TKB từng lớp** (Thời khóa biểu per class)
- Backend (NestJS) + Frontend (Next.js) phát triển **song song**
- Database: **MongoDB Atlas** (cloud)
- Authentication: **JWT** (cơ bản)
- Project structure: Single repo với `backend/` + `frontend/` folders
- **18 steps**, khoảng 2-3 tuần

---

## Overview: 18 Implementation Steps

### Phase Distribution

| Giai đoạn | Steps | Tên | Tính chất |
|-----------|-------|-----|----------|
| **A** | 1-3 | Project Setup | Tuần tự → Song song |
| **B** | 4-6 | Database & Auth | Tuần tự |
| **C** | 7-10 | Backend API | Tuần tự |
| **D** | 11-16 | Frontend Pages | Phần lớn tuần tự |
| **E** | 17-18 | Integration & Testing | Tuần tự |

---

## Detailed Steps

### **A. PROJECT SETUP** (Steps 1-3)

#### Step 1: Initialize Project Structure
**Phụ thuộc**: —  
**Thời gian**: 15 phút

Tạo cấu trúc thư mục root:
```
Schedule Helper/
├── backend/               (sẽ tạo ở step 2)
├── frontend/              (sẽ tạo ở step 3)
├── .github/
│   └── docs/
│       ├── timetable_school_project_prompt.md
│       └── phase-1-implementation-plan.md
├── .gitignore
└── README.md
```

**Actions**:
- Tạo `.gitignore` (Node.js, environment, build artifacts)
- Tạo `README.md` (project overview, setup instructions)
- Tạo `.env.example` (template cho backend/frontend env vars)

---

#### Step 2: Backend - NestJS Scaffolding
**Phụ thuộc**: Step 1  
**Thời gian**: 20 phút  
**Parallel với**: Step 3

```bash
# From root
nest new backend --package-manager npm
cd backend

# Install dependencies
npm install @nestjs/mongoose @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt mongoose
npm install --save-dev @types/passport-jwt
```

**Cấu trúc NestJS**:
```
backend/src/
├── main.ts                               — Entry point
├── app.module.ts                         — Root module
├── common/
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   └── roles.decorator.ts
│   ├── guards/
│   │   ├── jwt.guard.ts
│   │   └── roles.guard.ts
│   └── filters/
│       └── http-exception.filter.ts
├── config/
│   ├── database.config.ts
│   └── auth.config.ts
├── schemas/                              — Mongoose schemas
│   ├── user.schema.ts
│   ├── school.schema.ts
│   ├── academic-year.schema.ts
│   ├── class.schema.ts
│   ├── subject.schema.ts
│   ├── teacher.schema.ts
│   ├── room.schema.ts
│   ├── time-slot.schema.ts
│   └── timetable-entry.schema.ts
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── dto/
│   │       ├── register.dto.ts
│   │       └── login.dto.ts
│   ├── schools/
│   │   ├── schools.module.ts
│   │   ├── schools.controller.ts
│   │   ├── schools.service.ts
│   │   └── dto/
│   │       └── create-school.dto.ts
│   ├── academic-years/
│   │   ├── academic-years.module.ts
│   │   ├── academic-years.controller.ts
│   │   ├── academic-years.service.ts
│   │   └── dto/
│   │       └── create-academic-year.dto.ts
│   ├── classes/
│   │   ├── classes.module.ts
│   │   ├── classes.controller.ts
│   │   ├── classes.service.ts
│   │   └── dto/
│   │       └── create-class.dto.ts
│   ├── subjects/
│   │   ├── subjects.module.ts
│   │   ├── subjects.controller.ts
│   │   ├── subjects.service.ts
│   │   └── dto/
│   │       └── create-subject.dto.ts
│   ├── teachers/
│   │   ├── teachers.module.ts
│   │   ├── teachers.controller.ts
│   │   ├── teachers.service.ts
│   │   └── dto/
│   │       └── create-teacher.dto.ts
│   ├── rooms/
│   │   ├── rooms.module.ts
│   │   ├── rooms.controller.ts
│   │   ├── rooms.service.ts
│   │   └── dto/
│   │       └── create-room.dto.ts
│   ├── time-slots/
│   │   ├── time-slots.module.ts
│   │   ├── time-slots.controller.ts
│   │   ├── time-slots.service.ts
│   │   └── dto/
│   │       └── (none - read-only)
│   └── timetables/
│       ├── timetables.module.ts
│       ├── timetables.controller.ts
│       ├── timetables.service.ts
│       └── dto/
│           ├── create-timetable-entry.dto.ts
│           └── update-timetable-entry.dto.ts
├── .env                                  — (gitignored)
├── .env.example
├── package.json
└── tsconfig.json
```

**Actions**:
- Install packages (done above)
- Setup environment variables template (`.env.example`)
- Verify `npm run start:dev` works (should run on port 3000)

---

#### Step 3: Frontend - Next.js Scaffolding
**Phụ thuộc**: Step 1  
**Thời gian**: 20 phút  
**Parallel với**: Step 2

```bash
# From root
npx create-next-app@latest frontend --typescript --tailwindcss --skip-eslint
cd frontend

# Install additional dependencies
npm install axios zustand @tanstack/react-query date-fns
npm install -D @types/node @types/react
```

**Cấu trúc Next.js**:
```
frontend/
├── app/
│   ├── layout.tsx                        — Root layout (navbar, sidebar)
│   ├── page.tsx                          — Redirect to dashboard
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                    — Dashboard layout
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── timetable/
│   │   │   └── page.tsx                  — Bảng tổng
│   │   └── classes/
│   │       └── page.tsx                  — Class management
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── TimetableOverview.tsx             — Bảng tổng grid
│   ├── ClassTimetable.tsx                — TKB lớp grid
│   ├── SubjectModal.tsx                  — Select subject modal
│   ├── ClassForm.tsx                     — Add/Edit class form
│   └── LoadingSpinner.tsx
├── lib/
│   ├── api.ts                            — Axios client + endpoints
│   ├── auth.ts                           — JWT token management
│   ├── types.ts                          — TypeScript interfaces
│   └── constants.ts                      — Constants (URLs, etc.)
├── hooks/
│   ├── useAuth.ts                        — Auth state
│   ├── useTimetable.ts                   — Timetable queries
│   └── useToast.ts                       — Toast notifications
├── store/
│   └── authStore.ts                      — Zustand auth store (optional)
├── .env.local.example
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

**Actions**:
- Install packages (done above)
- Setup environment variables template (`.env.local.example`)
- Verify `npm run dev` works (should run on port 3000)

---

### **B. DATABASE & AUTH** (Steps 4-6)

#### Step 4: MongoDB Atlas Setup
**Phụ thuộc**: Step 2  
**Thời gian**: 15 phút

**Actions**:
1. Tạo account MongoDB Atlas (free tier: M0, 512MB)
2. Tạo cluster (region gần + tên "schedule-helper")
3. Tạo database user: `schedule_admin` (password)
4. Whitelist IP: `0.0.0.0/0` (development only)
5. Get connection string: `mongodb+srv://schedule_admin:<password>@schedule-helper.xxxxx.mongodb.net/schedule_db?retryWrites=true&w=majority`
6. Thêm vào `backend/.env`:
```env
MONGODB_URI=mongodb+srv://schedule_admin:<password>@schedule-helper.xxxxx.mongodb.net/schedule_db?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here-min-32-chars
JWT_EXPIRATION=7d
PORT=3000
```

**Verification**:
- [ ] Connect từ MongoDB Compass (desktop tool) hoặc web interface
- [ ] Database `schedule_db` được tạo (hoặc tự tạo khi insert data)

---

#### Step 5: Database Schemas (Mongoose)
**Phụ thuộc**: Step 4  
**Thời gian**: 1 giờ

Tạo các Mongoose schemas trong `backend/src/schemas/`:

**1. User Schema**
```typescript
// user.schema.ts
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['ADMIN', 'SCHEDULER', 'TEACHER', 'VIEWER'], default: 'VIEWER' })
  role: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

**2. School Schema**
```typescript
@Schema({ timestamps: true })
export class School {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
```

**3. AcademicYear Schema**
```typescript
@Schema({ timestamps: true })
export class AcademicYear {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'School' })
  schoolId: ObjectId;

  @Prop({ required: true })
  name: string; // e.g., "2026-2027"

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: false })
  isActive: boolean;
}

export const AcademicYearSchema = SchemaFactory.createForClass(AcademicYear);
AcademicYearSchema.index({ schoolId: 1, isActive: 1 });
```

**4. Class Schema**
```typescript
@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'AcademicYear' })
  academicYearId: ObjectId;

  @Prop({ required: true })
  grade: number; // 1, 2, 3

  @Prop({ required: true })
  name: string; // "1A", "1B", etc.

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Room' })
  roomId?: ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ academicYearId: 1 });
```

**5. Subject Schema**
```typescript
@Schema({ timestamps: true })
export class Subject {
  @Prop({ required: true })
  code: string; // "TOAN", "TV", etc.

  @Prop({ required: true })
  name: string; // "Toán", "Tiếng Việt", etc.

  @Prop({ required: true })
  shortName: string; // "T", "TV", etc.

  @Prop({ default: true })
  isActive: boolean;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
```

**6. Teacher Schema**
```typescript
@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string; // "GV001", etc.

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  department: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
```

**7. Room Schema**
```typescript
@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop()
  capacity: number;

  @Prop()
  type: string; // "CLASSROOM", "LAB", "GYM", etc.

  @Prop({ default: true })
  isActive: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
```

**8. TimeSlot Schema**
```typescript
@Schema({ timestamps: true })
export class TimeSlot {
  @Prop({ required: true })
  session: string; // "MORNING" or "AFTERNOON"

  @Prop({ required: true })
  period: number; // 1, 2, 3, 4, 5 (tiết)

  @Prop({ required: true })
  startTime: string; // "07:00"

  @Prop({ required: true })
  endTime: string; // "07:35"

  @Prop({ enum: ['CLASS', 'BREAK'], default: 'CLASS' })
  type: string;

  @Prop({ required: true })
  order: number; // để sort đúng thứ tự

  @Prop({ default: true })
  isActive: boolean;
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
TimeSlotSchema.index({ session: 1, order: 1 });
```

**9. TimetableEntry Schema**
```typescript
@Schema({ timestamps: true })
export class TimetableEntry {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'AcademicYear' })
  academicYearId: ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Class' })
  classId: ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Subject' })
  subjectId: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Teacher' })
  teacherId?: ObjectId;

  @Prop({ required: true, enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'] })
  dayOfWeek: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'TimeSlot' })
  timeSlotId: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Room' })
  roomId?: ObjectId;

  @Prop()
  note?: string;
}

export const TimetableEntrySchema = SchemaFactory.createForClass(TimetableEntry);
TimetableEntrySchema.index({ academicYearId: 1, classId: 1 });
TimetableEntrySchema.index({ academicYearId: 1, classId: 1, dayOfWeek: 1, timeSlotId: 1 });
TimetableEntrySchema.index({ teacherId: 1, dayOfWeek: 1, timeSlotId: 1 });
TimetableEntrySchema.index({ roomId: 1, dayOfWeek: 1, timeSlotId: 1 });
```

**Seeding Data** (create `backend/src/seeds/seed.ts`):
```typescript
// Tạo 1 school, 1 academic year, 3 classes, 5 subjects, 5 teachers, 1 room, 10 time slots
// Dữ liệu sample để test

Ví dụ:
- School: "Trường Tiểu học ABC"
- AcademicYear: "2026-2027" (startDate: 2026-08-15, endDate: 2027-06-30, isActive: true)
- Classes: "1A", "1B", "1C"
- Subjects: "Toán", "Tiếng Việt", "Tiếng Anh", "GDTC", "TNXH"
- Teachers: "GV Thúy", "GV Minh", "GV Hòa", "GV Lan", "GV Tuấn"
- Rooms: "Phòng 101"
- TimeSlots: 
  - Morning: Tiết 1-3 (07:00-08:55, break 08:55-09:20)
  - Morning: Tiết 4-5 (09:20-10:35)
  - Afternoon: Tiết 1-2 (13:00-14:15, break 14:15-14:35)
  - Afternoon: Tiết 3-5 (14:35-16:00)
```

**Actions**:
- Tạo tất cả 9 schemas
- Tạo seeding script
- Run seeding: `npm run seed` (hoặc call từ main.ts)

**Verification**:
- [ ] Connect MongoDB Compass → Database → Collections được tạo
- [ ] Data được seed: ~1 school, 3 classes, 5 subjects, 5 teachers, 1 room, 10 time slots

---

#### Step 6: Authentication Module (JWT)
**Phụ thuộc**: Step 5  
**Thời gian**: 1.5 giờ

Tạo auth module (`backend/src/modules/auth/`):

**1. DTOs**
```typescript
// auth/dto/register.dto.ts
export class RegisterDto {
  email: string;
  password: string;
  name: string;
}

// auth/dto/login.dto.ts
export class LoginDto {
  email: string;
  password: string;
}
```

**2. JWT Strategy**
```typescript
// auth/jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
```

**3. Auth Service**
```typescript
// auth/auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userModel.create({
      email: registerDto.email,
      passwordHash: hashedPassword,
      name: registerDto.name,
      role: 'VIEWER', // default role
    });
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user || !(await bcrypt.compare(loginDto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    };
  }
}
```

**4. Auth Controller**
```typescript
// auth/auth.controller.ts
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
```

**5. Auth Module**
```typescript
// auth/auth.module.ts
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRATION') },
      }),
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

**6. Decorators & Guards**
```typescript
// common/decorators/current-user.decorator.ts
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// common/guards/jwt.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// common/guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = Reflect.getMetadata('roles', context.getHandler());
    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredRoles.includes(user.role);
  }
}

// common/decorators/roles.decorator.ts
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

**Actions**:
- Implement Auth module (register, login, JWT strategy)
- Implement Guards (JWT, Roles)
- Test endpoints:
  - `POST /auth/register` → { access_token, user }
  - `POST /auth/login` → { access_token, user }
  - `GET /auth/profile` (with Bearer token) → user info

**Verification**:
- [ ] Register: `curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"password123","name":"Test User"}'` → token
- [ ] Login: `curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"password123"}'` → token
- [ ] Profile: `curl http://localhost:3000/auth/profile -H "Authorization: Bearer <token>"` → user info

---

### **C. BACKEND API** (Steps 7-10)

#### Step 7: School & AcademicYear Modules
**Phụ thuộc**: Step 6  
**Thời gian**: 1.5 giờ

**School Module** (`backend/src/modules/schools/`):

```typescript
// schools/schools.controller.ts
@Controller('schools')
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}

  @Get()
  findAll() {
    return this.schoolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolsService.update(id, updateSchoolDto);
  }
}

// schools/schools.service.ts
@Injectable()
export class SchoolsService {
  constructor(@InjectModel(School.name) private schoolModel: Model<SchoolDocument>) {}

  findAll() {
    return this.schoolModel.find({ isActive: true });
  }

  findOne(id: string) {
    return this.schoolModel.findById(id);
  }

  create(createSchoolDto: CreateSchoolDto) {
    return this.schoolModel.create(createSchoolDto);
  }

  update(id: string, updateSchoolDto: UpdateSchoolDto) {
    return this.schoolModel.findByIdAndUpdate(id, updateSchoolDto, { new: true });
  }
}
```

**AcademicYear Module** (`backend/src/modules/academic-years/`):

```typescript
// academic-years/academic-years.controller.ts
@Controller('academic-years')
export class AcademicYearsController {
  constructor(private academicYearsService: AcademicYearsService) {}

  @Get('school/:schoolId')
  findBySchool(@Param('schoolId') schoolId: string) {
    return this.academicYearsService.findBySchool(schoolId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicYearsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() createAcademicYearDto: CreateAcademicYearDto) {
    return this.academicYearsService.create(createAcademicYearDto);
  }
}

// academic-years/academic-years.service.ts
@Injectable()
export class AcademicYearsService {
  constructor(
    @InjectModel(AcademicYear.name) private academicYearModel: Model<AcademicYearDocument>,
  ) {}

  findBySchool(schoolId: string) {
    return this.academicYearModel.find({ schoolId, isActive: true });
  }

  findOne(id: string) {
    return this.academicYearModel.findById(id);
  }

  create(createAcademicYearDto: CreateAcademicYearDto) {
    return this.academicYearModel.create(createAcademicYearDto);
  }
}
```

**Actions**:
- Implement School & AcademicYear modules
- Test endpoints:
  - `GET /schools` → list of schools
  - `GET /schools/:id` → school detail
  - `GET /academic-years/school/:schoolId` → list of academic years for school
  - `POST /schools` (admin) → create school
  - `POST /academic-years` (admin) → create academic year

---

#### Step 8: Master Data Modules (Class, Subject, Teacher, Room, TimeSlot)
**Phụ thuộc**: Step 7  
**Thời gian**: 2 giờ

Tạo CRUD modules cho:
- **Class** → `GET /classes`, `GET /classes/:id`, `POST /classes` (admin), `PUT /classes/:id` (admin)
- **Subject** → `GET /subjects`, `POST /subjects` (admin)
- **Teacher** → `GET /teachers`, `POST /teachers` (admin)
- **Room** → `GET /rooms`, `POST /rooms` (admin)
- **TimeSlot** → `GET /time-slots` (public, readonly)

Pattern for each module:
1. Controller với các methods
2. Service với logic
3. DTO cho validation
4. Role checks (admin-only untuk create/update)
5. Query optimization

**Ví dụ Class Module**:
```typescript
// classes/classes.controller.ts
@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @Get('academic-year/:academicYearId')
  findByAcademicYear(@Param('academicYearId') academicYearId: string) {
    return this.classesService.findByAcademicYear(academicYearId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SCHEDULER')
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SCHEDULER')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SCHEDULER')
  delete(@Param('id') id: string) {
    return this.classesService.delete(id);
  }
}

// classes/classes.service.ts
@Injectable()
export class ClassesService {
  constructor(@InjectModel(Class.name) private classModel: Model<ClassDocument>) {}

  findByAcademicYear(academicYearId: string) {
    return this.classModel
      .find({ academicYearId, isActive: true })
      .sort({ grade: 1, name: 1 });
  }

  findOne(id: string) {
    return this.classModel.findById(id).populate('roomId');
  }

  create(createClassDto: CreateClassDto) {
    return this.classModel.create(createClassDto);
  }

  update(id: string, updateClassDto: UpdateClassDto) {
    return this.classModel.findByIdAndUpdate(id, updateClassDto, { new: true });
  }

  delete(id: string) {
    return this.classModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }
}
```

**Actions**:
- Implement 5 modules (Class, Subject, Teacher, Room, TimeSlot)
- Test all endpoints
- Verify role-based access control

---

#### Step 9: TimetableEntry Module - GET Endpoints
**Phụ thuộc**: Step 8  
**Thời gian**: 1.5 giờ

Implement query endpoints:

```typescript
// timetables/timetables.controller.ts
@Controller('timetables')
export class TimetablesController {
  constructor(private timetablesService: TimetablesService) {}

  /**
   * GET /timetables/academic-year/:academicYearId
   * Bảng tổng: Returns all entries grouped for overview display
   * Format: { dayOfWeek, timeSlotId, classId, subjectId, teacherId, roomId, note }
   */
  @Get('academic-year/:academicYearId')
  @UseGuards(JwtAuthGuard)
  getOverview(@Param('academicYearId') academicYearId: string) {
    return this.timetablesService.getOverview(academicYearId);
  }

  /**
   * GET /timetables/class/:classId
   * TKB lớp: Returns entries for specific class, grouped by day/timeslot
   */
  @Get('class/:classId')
  @UseGuards(JwtAuthGuard)
  getClassTimetable(@Param('classId') classId: string) {
    return this.timetablesService.getClassTimetable(classId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.timetablesService.findOne(id);
  }
}

// timetables/timetables.service.ts
@Injectable()
export class TimetablesService {
  constructor(
    @InjectModel(TimetableEntry.name)
    private timetableEntryModel: Model<TimetableEntryDocument>,
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    @InjectModel(TimeSlot.name) private timeSlotModel: Model<TimeSlotDocument>,
  ) {}

  async getOverview(academicYearId: string) {
    const entries = await this.timetableEntryModel
      .find({ academicYearId })
      .populate('classId')
      .populate('subjectId')
      .populate('teacherId')
      .populate('timeSlotId')
      .populate('roomId');

    return entries;
  }

  async getClassTimetable(classId: string) {
    const entries = await this.timetableEntryModel
      .find({ classId })
      .populate('subjectId')
      .populate('teacherId')
      .populate('timeSlotId')
      .sort({ dayOfWeek: 1 });

    // Group by dayOfWeek and timeSlot
    const grouped = this.groupByDayAndSlot(entries);
    return grouped;
  }

  findOne(id: string) {
    return this.timetableEntryModel
      .findById(id)
      .populate('classId')
      .populate('subjectId')
      .populate('teacherId')
      .populate('timeSlotId')
      .populate('roomId');
  }

  private groupByDayAndSlot(entries: any[]) {
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
    const grouped = {};

    days.forEach(day => {
      grouped[day] = {};
      entries
        .filter(e => e.dayOfWeek === day)
        .forEach(e => {
          const slotId = e.timeSlotId._id.toString();
          grouped[day][slotId] = {
            subject: e.subjectId.name,
            teacher: e.teacherId?.name || 'N/A',
            room: e.roomId?.name || 'N/A',
          };
        });
    });

    return grouped;
  }
}
```

**Response format examples**:

Overview:
```json
[
  {
    "_id": "...",
    "academicYearId": "...",
    "classId": { "_id": "...", "name": "1A", "grade": 1 },
    "subjectId": { "_id": "...", "name": "Toán", "code": "TOAN" },
    "teacherId": { "_id": "...", "name": "Cô Thúy" },
    "dayOfWeek": "MONDAY",
    "timeSlotId": { "_id": "...", "period": 1, "startTime": "07:00", "endTime": "07:35" },
    "roomId": { "_id": "...", "name": "Phòng 101" },
    "note": null
  },
  ...
]
```

Class Timetable:
```json
{
  "MONDAY": {
    "slot1": {
      "subject": "Toán",
      "teacher": "Cô Thúy",
      "room": "Phòng 101"
    },
    "slot2": {
      "subject": "Tiếng Việt",
      "teacher": "Cô Minh",
      "room": "Phòng 101"
    },
    ...
  },
  "TUESDAY": { ... },
  ...
}
```

**Actions**:
- Implement GET endpoints
- Test queries with seeded data
- Verify population and grouping

---

#### Step 10: TimetableEntry Module - Create/Update/Delete Endpoints
**Phụ thuộc**: Step 9  
**Thời gian**: 1.5 giờ

```typescript
// timetables/dto/create-timetable-entry.dto.ts
export class CreateTimetableEntryDto {
  academicYearId: string;
  classId: string;
  subjectId: string;
  teacherId?: string;
  dayOfWeek: string;
  timeSlotId: string;
  roomId?: string;
  note?: string;
}

// timetables/dto/update-timetable-entry.dto.ts
export class UpdateTimetableEntryDto extends PartialType(CreateTimetableEntryDto) {}

// timetables/timetables.controller.ts (continued)
@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SCHEDULER')
create(@Body() createTimetableEntryDto: CreateTimetableEntryDto) {
  return this.timetablesService.create(createTimetableEntryDto);
}

@Put(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SCHEDULER')
update(
  @Param('id') id: string,
  @Body() updateTimetableEntryDto: UpdateTimetableEntryDto,
) {
  return this.timetablesService.update(id, updateTimetableEntryDto);
}

@Delete(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SCHEDULER')
delete(@Param('id') id: string) {
  return this.timetablesService.delete(id);
}

// timetables/timetables.service.ts (continued)
async create(createTimetableEntryDto: CreateTimetableEntryDto) {
  // Basic validation: check foreign keys exist
  await this.validateForeignKeys(createTimetableEntryDto);
  return this.timetableEntryModel.create(createTimetableEntryDto);
}

async update(id: string, updateTimetableEntryDto: UpdateTimetableEntryDto) {
  await this.validateForeignKeys(updateTimetableEntryDto);
  return this.timetableEntryModel.findByIdAndUpdate(id, updateTimetableEntryDto, {
    new: true,
  });
}

async delete(id: string) {
  return this.timetableEntryModel.findByIdAndDelete(id);
}

private async validateForeignKeys(dto: any) {
  const { classId, subjectId, teacherId, timeSlotId, roomId } = dto;

  // Check if referenced entities exist
  if (classId) {
    const classExists = await this.classModel.exists({ _id: classId });
    if (!classExists) throw new BadRequestException('Class not found');
  }

  if (subjectId) {
    const subjectExists = await this.subjectModel.exists({ _id: subjectId });
    if (!subjectExists) throw new BadRequestException('Subject not found');
  }

  if (teacherId) {
    const teacherExists = await this.teacherModel.exists({ _id: teacherId });
    if (!teacherExists) throw new BadRequestException('Teacher not found');
  }

  if (timeSlotId) {
    const slotExists = await this.timeSlotModel.exists({ _id: timeSlotId });
    if (!slotExists) throw new BadRequestException('TimeSlot not found');
  }

  if (roomId) {
    const roomExists = await this.roomModel.exists({ _id: roomId });
    if (!roomExists) throw new BadRequestException('Room not found');
  }
}
```

**Actions**:
- Implement POST/PUT/DELETE endpoints
- Add foreign key validation
- Test CRUD flow:
  - `POST /timetables` → create entry
  - `PUT /timetables/:id` → update entry
  - `DELETE /timetables/:id` → delete entry
  - `GET /timetables/class/:classId` → verify deletion

**Verification**:
- [ ] Backend API fully functional (all CRUD)
- [ ] All endpoints tested with curl/Postman
- [ ] Error handling works (validation, not found, etc.)
- [ ] Role-based access control enforced

---

### **D. FRONTEND PAGES** (Steps 11-16)

#### Step 11: Auth Pages (Login, Register)
**Phụ thuộc**: Step 3  
**Thời gian**: 1.5 giờ

**1. API Client Setup**
```typescript
// frontend/lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const authApi = {
  register: (email: string, password: string, name: string) =>
    apiClient.post('/auth/register', { email, password, name }),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  getProfile: () => apiClient.get('/auth/profile'),
};

export const schoolApi = {
  getAll: () => apiClient.get('/schools'),
  getById: (id: string) => apiClient.get(`/schools/${id}`),
};

export const academicYearApi = {
  getBySchool: (schoolId: string) => apiClient.get(`/academic-years/school/${schoolId}`),
};

export const classApi = {
  getByAcademicYear: (academicYearId: string) =>
    apiClient.get(`/classes/academic-year/${academicYearId}`),
  create: (data: any) => apiClient.post('/classes', data),
  update: (id: string, data: any) => apiClient.put(`/classes/${id}`, data),
  delete: (id: string) => apiClient.delete(`/classes/${id}`),
};

export const subjectApi = {
  getAll: () => apiClient.get('/subjects'),
};

export const timetableApi = {
  getOverview: (academicYearId: string) =>
    apiClient.get(`/timetables/academic-year/${academicYearId}`),
  getClassTimetable: (classId: string) => apiClient.get(`/timetables/class/${classId}`),
  create: (data: any) => apiClient.post('/timetables', data),
  update: (id: string, data: any) => apiClient.put(`/timetables/${id}`, data),
  delete: (id: string) => apiClient.delete(`/timetables/${id}`),
};
```

**2. Auth Management**
```typescript
// frontend/lib/auth.ts
export const tokenStorage = {
  setToken: (token: string) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  removeToken: () => localStorage.removeItem('token'),
  setUser: (user: any) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('user'),
  isAuthenticated: () => !!localStorage.getItem('token'),
};

// Zustand store
// frontend/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (email, password) => {
    const res = await authApi.login(email, password);
    tokenStorage.setToken(res.data.access_token);
    tokenStorage.setUser(res.data.user);
    set({ user: res.data.user, token: res.data.access_token });
  },
  register: async (email, password, name) => {
    const res = await authApi.register(email, password, name);
    tokenStorage.setToken(res.data.access_token);
    tokenStorage.setUser(res.data.user);
    set({ user: res.data.user, token: res.data.access_token });
  },
  logout: () => {
    tokenStorage.removeToken();
    tokenStorage.removeUser();
    set({ user: null, token: null });
  },
  loadUser: () => {
    const user = tokenStorage.getUser();
    const token = tokenStorage.getToken();
    if (user && token) {
      set({ user, token });
    }
  },
}));
```

**3. Login Page**
```typescript
// frontend/app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
```

**4. Register Page** (tương tự)

**5. TypeScript Types**
```typescript
// frontend/lib/types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'SCHEDULER' | 'TEACHER' | 'VIEWER';
}

export interface School {
  _id: string;
  name: string;
  address: string;
}

export interface AcademicYear {
  _id: string;
  schoolId: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Class {
  _id: string;
  academicYearId: string;
  grade: number;
  name: string;
  roomId?: string;
}

export interface Subject {
  _id: string;
  code: string;
  name: string;
  shortName: string;
}

export interface Teacher {
  _id: string;
  name: string;
  code: string;
  email: string;
}

export interface TimeSlot {
  _id: string;
  session: 'MORNING' | 'AFTERNOON';
  period: number;
  startTime: string;
  endTime: string;
  order: number;
}

export interface TimetableEntry {
  _id: string;
  academicYearId: string;
  classId: string;
  subjectId: string;
  teacherId?: string;
  dayOfWeek: string;
  timeSlotId: string;
  roomId?: string;
  note?: string;
}
```

**Actions**:
- Setup API client with axios + interceptors
- Create Zustand auth store
- Create Login & Register pages
- Test: register user → login → dashboard

---

#### Step 12: Layout & Dashboard
**Phụ thuộc**: Step 11  
**Thời gian**: 1 giờ

**1. Root Layout**
```typescript
// frontend/app/layout.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadUser, token } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

**2. Dashboard Layout** (with navbar, sidebar)
```typescript
// frontend/app/(dashboard)/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, token, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
    if (!token) {
      router.push('/auth/login');
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
```

**3. Navbar Component**
```typescript
// frontend/components/Navbar.tsx
'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Schedule Helper</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
```

**4. Sidebar Component**
```typescript
// frontend/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/timetable', label: 'Bảng Tổng' },
    { href: '/classes', label: 'Lớp' },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 p-6">
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block px-4 py-2 rounded ${
                pathname === link.href ? 'bg-blue-500' : 'hover:bg-gray-700'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

**5. Dashboard Page**
```typescript
// frontend/app/(dashboard)/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { schoolApi, academicYearApi } from '@/lib/api';
import { School, AcademicYear } from '@/lib/types';

export default function DashboardPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await schoolApi.getAll();
      setSchools(res.data);
      if (res.data.length > 0) {
        setSelectedSchool(res.data[0]._id);
      }
    } catch (err) {
      console.error('Failed to fetch schools', err);
    }
  };

  useEffect(() => {
    if (selectedSchool) {
      fetchAcademicYears();
    }
  }, [selectedSchool]);

  const fetchAcademicYears = async () => {
    try {
      const res = await academicYearApi.getBySchool(selectedSchool);
      setAcademicYears(res.data);
      if (res.data.length > 0) {
        setSelectedAcademicYear(res.data[0]._id);
      }
    } catch (err) {
      console.error('Failed to fetch academic years', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">School</label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {schools.map((school) => (
                <option key={school._id} value={school._id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Academic Year</label>
            <select
              value={selectedAcademicYear}
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {academicYears.map((year) => (
                <option key={year._id} value={year._id}>
                  {year.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
        <p className="text-gray-700">
          Selected: {schools.find(s => s._id === selectedSchool)?.name} - {academicYears.find(y => y._id === selectedAcademicYear)?.name}
        </p>
      </div>
    </div>
  );
}
```

**Actions**:
- Create Navbar, Sidebar, Dashboard components
- Implement school/academic year selector
- Test: login → dashboard → select school/year

---

#### Step 13: Bảng Tổng Component (TimetableOverview)
**Phụ thuộc**: Step 12  
**Thời gian**: 2 giờ

```typescript
// frontend/app/(dashboard)/timetable/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TimetableOverview from '@/components/TimetableOverview';
import SubjectModal from '@/components/SubjectModal';
import { timetableApi } from '@/lib/api';

export default function TimetablePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [academicYearId, setAcademicYearId] = useState(searchParams.get('academicYearId') || '');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCell, setSelectedCell] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (academicYearId) {
      fetchTimetable();
    }
  }, [academicYearId]);

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const res = await timetableApi.getOverview(academicYearId);
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch timetable', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (dayOfWeek: string, timeSlotId: string, classId: string) => {
    setSelectedCell({ dayOfWeek, timeSlotId, classId });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCell(null);
    fetchTimetable(); // Refetch data
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bảng Tổng</h1>
      
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <>
          <TimetableOverview data={data} onCellClick={handleCellClick} />
          {showModal && (
            <SubjectModal
              cell={selectedCell}
              academicYearId={academicYearId}
              onClose={handleModalClose}
            />
          )}
        </>
      )}
    </div>
  );
}
```

```typescript
// frontend/components/TimetableOverview.tsx
'use client';

import React from 'react';

interface Props {
  data: any[];
  onCellClick: (dayOfWeek: string, timeSlotId: string, classId: string) => void;
}

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const SESSIONS = ['MORNING', 'AFTERNOON'];

export default function TimetableOverview({ data, onCellClick }: Props) {
  // Build lookup map: classId -> { dayOfWeek -> { timeSlotId -> entry } }
  const buildGrid = () => {
    const grid: Record<string, any> = {};
    data.forEach((entry) => {
      const key = `${entry.classId._id}|${entry.dayOfWeek}|${entry.timeSlotId._id}`;
      grid[key] = entry;
    });
    return grid;
  };

  const grid = buildGrid();

  // Get unique classes and time slots
  const classes = Array.from(
    new Map(data.map((e) => [e.classId._id, e.classId])).values(),
  ).sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name));

  const timeSlots = Array.from(
    new Map(data.map((e) => [e.timeSlotId._id, e.timeSlotId])).values(),
  ).sort((a, b) => a.order - b.order);

  // Group time slots by session
  const timeSlotsBySession = timeSlots.reduce(
    (acc, slot) => {
      if (!acc[slot.session]) acc[slot.session] = [];
      acc[slot.session].push(slot);
      return acc;
    },
    {} as Record<string, any[]>,
  );

  // Group classes by grade (block)
  const classesByGrade = classes.reduce(
    (acc, cls) => {
      if (!acc[cls.grade]) acc[cls.grade] = [];
      acc[cls.grade].push(cls);
      return acc;
    },
    {} as Record<number, any[]>,
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Thứ</th>
            <th className="border border-gray-300 px-4 py-2">Buổi</th>
            {Object.keys(classesByGrade).map((grade) =>
              classesByGrade[Number(grade)].map((cls) => (
                <th key={cls._id} className="border border-gray-300 px-4 py-2">
                  {cls.name}
                </th>
              )),
            )}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day) =>
            SESSIONS.map((session) => {
              const slots = timeSlotsBySession[session] || [];
              return slots.map((slot, idx) => (
                <tr key={`${day}-${session}-${slot._id}`}>
                  {idx === 0 && (
                    <>
                      <td
                        className="border border-gray-300 px-4 py-2 font-semibold"
                        rowSpan={slots.length}
                      >
                        {day}
                      </td>
                      <td
                        className="border border-gray-300 px-4 py-2"
                        rowSpan={slots.length}
                      >
                        {session === 'MORNING' ? 'Sáng' : 'Chiều'}
                      </td>
                    </>
                  )}
                  {Object.keys(classesByGrade).map((grade) =>
                    classesByGrade[Number(grade)].map((cls) => {
                      const key = `${cls._id}|${day}|${slot._id}`;
                      const entry = grid[key];
                      return (
                        <td
                          key={`${cls._id}`}
                          className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-blue-100"
                          onClick={() => onCellClick(day, slot._id, cls._id)}
                        >
                          {entry ? (
                            <div className="text-sm">
                              <div className="font-semibold">{entry.subjectId.shortName}</div>
                              <div className="text-xs text-gray-600">{entry.teacherId?.name}</div>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-sm">—</div>
                          )}
                        </td>
                      );
                    }),
                  )}
                </tr>
              ));
            }),
          )}
        </tbody>
      </table>
    </div>
  );
}
```

**Actions**:
- Create TimetableOverview component
- Render grid: rows (day/session/slot), columns (classes)
- Handle cell click → open modal

---

#### Step 14: TKB Lớp Component (ClassTimetable)
**Phụ thuộc**: Step 12  
**Thời gian**: 1.5 giờ

```typescript
// frontend/app/(dashboard)/classes/[classId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ClassTimetable from '@/components/ClassTimetable';
import { timetableApi } from '@/lib/api';

export default function ClassTimetablePage() {
  const params = useParams();
  const classId = params.classId as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClassTimetable();
  }, [classId]);

  const fetchClassTimetable = async () => {
    setLoading(true);
    try {
      const res = await timetableApi.getClassTimetable(classId);
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch class timetable', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">TKB Lớp</h1>
      
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <ClassTimetable data={data} />
      )}
    </div>
  );
}
```

```typescript
// frontend/components/ClassTimetable.tsx
'use client';

import React from 'react';

interface Props {
  data: any;
}

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const DAY_LABELS: Record<string, string> = {
  MONDAY: 'Thứ 2',
  TUESDAY: 'Thứ 3',
  WEDNESDAY: 'Thứ 4',
  THURSDAY: 'Thứ 5',
  FRIDAY: 'Thứ 6',
};

export default function ClassTimetable({ data }: Props) {
  // data format:
  // {
  //   "MONDAY": {
  //     "slot1": { subject, teacher, room },
  //     "slot2": { ... }
  //   },
  //   ...
  // }

  if (!data) return <div>No data</div>;

  // Get all slot IDs
  const allSlots = new Set<string>();
  Object.values(data).forEach((day: any) => {
    Object.keys(day).forEach((slot) => allSlots.add(slot));
  });
  const slots = Array.from(allSlots).sort();

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Tiết</th>
            {DAYS.map((day) => (
              <th key={day} className="border border-gray-300 px-4 py-2">
                {DAY_LABELS[day]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot}>
              <td className="border border-gray-300 px-4 py-2 font-semibold">{slot}</td>
              {DAYS.map((day) => {
                const entry = data[day]?.[slot];
                return (
                  <td key={`${day}-${slot}`} className="border border-gray-300 px-4 py-2">
                    {entry ? (
                      <div className="text-sm">
                        <div className="font-semibold">{entry.subject}</div>
                        <div className="text-xs text-gray-600">{entry.teacher}</div>
                        <div className="text-xs text-gray-600">{entry.room}</div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">—</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**Actions**:
- Create ClassTimetable component
- Display TKB in grid: rows (time slots), columns (days)
- Add link from bảng tổng class cell to class timetable page

---

#### Step 15: Select Subject Modal & Edit Cell
**Phụ thuộc**: Step 13, 14  
**Thời gian**: 2 giờ

```typescript
// frontend/components/SubjectModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { subjectApi, teacherApi, roomApi, timetableApi } from '@/lib/api';
import { Subject, Teacher, Room } from '@/lib/types';

interface Props {
  cell: { dayOfWeek: string; timeSlotId: string; classId: string };
  academicYearId: string;
  onClose: () => void;
}

export default function SubjectModal({ cell, academicYearId, onClose }: Props) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [existingEntry, setExistingEntry] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subRes, tcRes, rmRes] = await Promise.all([
        subjectApi.getAll(),
        teacherApi.getAll(),
        roomApi.getAll(),
      ]);
      setSubjects(subRes.data);
      setTeachers(tcRes.data);
      setRooms(rmRes.data);

      // Check if entry exists for this cell
      const entries = await timetableApi.getClassTimetable(cell.classId);
      const daySlotEntries = entries.data[cell.dayOfWeek];
      if (daySlotEntries && daySlotEntries[cell.timeSlotId]) {
        const entry = daySlotEntries[cell.timeSlotId];
        // Pre-fill form (need entry ID though)
        setSelectedSubject(entry.subject);
      }
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  const handleSave = async () => {
    if (!selectedSubject) {
      alert('Please select a subject');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        academicYearId,
        classId: cell.classId,
        subjectId: selectedSubject,
        teacherId: selectedTeacher || undefined,
        dayOfWeek: cell.dayOfWeek,
        timeSlotId: cell.timeSlotId,
        roomId: selectedRoom || undefined,
        note: note || undefined,
      };

      if (existingEntry?._id) {
        await timetableApi.update(existingEntry._id, payload);
      } else {
        await timetableApi.create(payload);
      }

      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingEntry?._id) return;
    
    if (!confirm('Delete this entry?')) return;

    setLoading(true);
    try {
      await timetableApi.delete(existingEntry._id);
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Chọn Môn Học</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Môn</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Chọn Môn --</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Giáo Viên</label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Chọn Giáo Viên --</option>
              {teachers.map((tcr) => (
                <option key={tcr._id} value={tcr._id}>
                  {tcr.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phòng</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Chọn Phòng --</option>
              {rooms.map((rm) => (
                <option key={rm._id} value={rm._id}>
                  {rm.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Ghi Chú</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          {existingEntry && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
            >
              Delete
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Actions**:
- Implement SubjectModal with subject/teacher/room dropdowns
- Handle save (create/update) and delete
- Test: click cell → modal → select subject → save

---

#### Step 16: Class Management (Add/Edit/Delete)
**Phụ thuộc**: Step 12  
**Thời gian**: 1.5 giờ

```typescript
// frontend/app/(dashboard)/classes/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { classApi } from '@/lib/api';
import ClassForm from '@/components/ClassForm';
import { Class } from '@/lib/types';

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [academicYearId, setAcademicYearId] = useState(''); // From dashboard context

  useEffect(() => {
    if (academicYearId) {
      fetchClasses();
    }
  }, [academicYearId]);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await classApi.getByAcademicYear(academicYearId);
      setClasses(res.data);
    } catch (err) {
      console.error('Failed to fetch classes', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingClass) {
        await classApi.update(editingClass._id, data);
      } else {
        await classApi.create({ ...data, academicYearId });
      }
      setShowForm(false);
      setEditingClass(null);
      fetchClasses();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this class?')) return;
    try {
      await classApi.delete(id);
      fetchClasses();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Classes</h1>
        <button
          onClick={() => {
            setEditingClass(null);
            setShowForm(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Class
        </button>
      </div>

      {showForm && (
        <ClassForm
          initialData={editingClass}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Grade</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{cls.name}</td>
                  <td className="px-6 py-4">{cls.grade}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => {
                        setEditingClass(cls);
                        setShowForm(true);
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cls._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

```typescript
// frontend/components/ClassForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Class } from '@/lib/types';

interface Props {
  initialData: Class | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function ClassForm({ initialData, onSave, onCancel }: Props) {
  const [grade, setGrade] = useState(initialData?.grade || 1);
  const [name, setName] = useState(initialData?.name || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({ grade, name });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Grade</label>
            <input
              type="number"
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
```

**Actions**:
- Create class management page with CRUD
- Test: add class → list updated → edit class → delete class

---

### **E. INTEGRATION & TESTING** (Steps 17-18)

#### Step 17: End-to-End Workflow Testing
**Phụ thuộc**: Step 16  
**Thời gian**: 1.5 giờ

**Test scenario**:
1. Register new user
2. Login
3. See dashboard with school/academic year selector
4. Navigate to bảng tổng → see grid with seeded data
5. Click empty cell → SubjectModal opens
6. Select subject, teacher, room → Save
7. Grid updates with new entry
8. Navigate to class timetable → see updated entry
9. Edit entry from class timetable (or bảng tổng)
10. Delete entry → grid updates

**Verification**:
- [ ] All pages accessible
- [ ] No console errors
- [ ] Data flows correctly backend → frontend
- [ ] Create/update/delete works
- [ ] UI responsive

---

#### Step 18: Deployment Preparation
**Phụ thuộc**: Step 17  
**Thời gian**: 1 giờ

**Backend**:
- [ ] Create `.env.production` for production MongoDB
- [ ] Deploy to Heroku/Railway: `git push heroku main`
- [ ] Verify API endpoints accessible

**Frontend**:
- [ ] Create `.env.production.local` with production API URL
- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Verify frontend connects to production backend

**Documentation**:
- [ ] Update `README.md` with setup steps
- [ ] Create `DEPLOYMENT.md` with deployment instructions

**Verification**:
- [ ] Production APIs work
- [ ] Frontend-backend communication works
- [ ] No sensitive data in code/git

---

## Summary

| Phase | Steps | Time | Status |
|-------|-------|------|--------|
| **A - Project Setup** | 1-3 | 55 min | 🚀 Ready |
| **B - Database & Auth** | 4-6 | 2.75 hrs | 🚀 Ready |
| **C - Backend API** | 7-10 | 4.5 hrs | 🚀 Ready |
| **D - Frontend Pages** | 11-16 | 9.5 hrs | 🚀 Ready |
| **E - Integration & Testing** | 17-18 | 2.5 hrs | 🚀 Ready |
| **TOTAL** | **18** | **~20 hours** | ✅ |

---

## Key Decisions

1. **Backend & Frontend parallel**: Both teams work simultaneously → faster delivery
2. **MongoDB Atlas**: No local setup → easier collaboration
3. **JWT + localStorage**: Simple auth for MVP
4. **No validation rules in Phase 1**: Focus on core CRUD only
5. **Single repo structure**: `backend/` + `frontend/` → simple Git management
6. **RESTful API**: Standard, easy to maintain

---

## Next Steps

1. ✅ Get plan approval
2. 📝 Create this file (done!)
3. 🚀 Start implementation from Step 1
4. 🔄 Parallel work: Backend + Frontend
5. 🧪 E2E testing
6. 🌐 Deploy

---

**Plan created**: 2026-08-17  
**Target completion**: ~2-3 weeks  
**Status**: Ready for implementation
