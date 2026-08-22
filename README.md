# Schedule Helper - Hệ thống quản lý thời khóa biểu

A comprehensive web application for schools to manage, build, and track timetables with an interactive interface.

**Thay thế Excel bằng web application có cấu trúc dữ liệu đúng và khả năng mở rộng lâu dài.**

## 🎯 Project Overview

### Tổng quan
Schedule Helper là một hệ thống web giúp nhà trường:
- ✅ Quản lý thời khóa biểu (TKB) một cách có cấu trúc
- ✅ Xem bảng tổng (tất cả lớp cùng một lúc)
- ✅ Xem TKB riêng từng lớp
- ✅ Đếm tiết và kiểm tra chương trình học
- ✅ Phát hiện xung đột (lớp, giáo viên, phòng)
- ✅ Quản lý lớp, môn, giáo viên, phòng, khung giờ
- ✅ Phân quyền người dùng (Admin, Scheduler, Teacher, Viewer)

### Nguyên tắc kiến trúc quan trọng nhất
- **Một nguồn dữ liệu**: `TimetableEntry` là dữ liệu trung tâm
- **Nhiều cách hiển thị**: Bảng tổng, TKB lớp, TKB giáo viên, TKB phòng đều từ cùng dữ liệu
- **Không duplicate**: Không lưu riêng bảng tổng và TKB từng lớp

Xem chi tiết: [Prompt định hướng dự án](./.github/docs/timetable_school_project_prompt.md)

## 📋 Phase 1 - Core MVP

**Mục tiêu**: Có thể sử dụng web thay cho bảng Excel cơ bản

**Features**:
- Authentication (Login/Register)
- Bảng tổng interactif
- TKB từng lớp
- Chọn môn bằng modal
- Quản lý lớp (Add/Edit/Delete)
- Lưu dữ liệu vào database

**Plan chi tiết**: [Phase 1 Implementation Plan](./.github/docs/phase-1-implementation-plan.md)

## 🏗️ Project Structure

```
Schedule Helper/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── modules/
│   │   ├── schemas/
│   │   └── ...
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # Next.js web app
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── .env.local.example
│   ├── package.json
│   └── tsconfig.json
├── .github/
│   └── docs/
│       ├── timetable_school_project_prompt.md
│       └── phase-1-implementation-plan.md
├── .gitignore
├── README.md
└── .env.example
```

## 🛠️ Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT + bcrypt
- **Validation**: class-validator

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [Axios](https://axios-http.com/) + [React Query](https://tanstack.com/query/latest)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **HTTP Client**: Axios

### DevOps
- **Database Hosting**: MongoDB Atlas (Cloud)
- **Backend Deployment**: Heroku/Railway
- **Frontend Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn
- MongoDB Atlas account (free tier: M0)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env from .env.example and fill values
cp .env.example .env
# Edit .env:
#   MONGODB_URI=mongodb+srv://...
#   JWT_SECRET=your-secret-key-here-min-32-chars

# Run development server
npm run start:dev

# Server runs on http://localhost:3000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local from .env.local.example
cp .env.local.example .env.local
# Edit .env.local:
#   NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Run development server
npm run dev

# App runs on http://localhost:3000
```

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://schedule_admin:<password>@schedule-helper.xxxxx.mongodb.net/schedule_db?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here-min-32-chars-xxxxxxxxxxxxxxxx
JWT_EXPIRATION=7d
PORT=3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🔄 Development Workflow

### 1. Backend Development
```bash
cd backend
npm run start:dev    # Hot reload with Nest CLI
npm run lint         # Run ESLint
npm run test         # Run tests
```

### 2. Frontend Development
```bash
cd frontend
npm run dev          # Development server (hot reload)
npm run build        # Production build
npm run lint         # Run linting
```

### 3. Database
- MongoDB Atlas: [https://account.mongodb.com/account/login](https://account.mongodb.com/account/login)
- GUI Client: [MongoDB Compass](https://www.mongodb.com/products/tools/compass)

## 📚 API Documentation

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `GET /auth/profile` - Get current user profile

### Schools
- `GET /schools` - List all schools
- `GET /schools/:id` - Get school detail
- `POST /schools` - Create school (admin)

### Academic Years
- `GET /academic-years/school/:schoolId` - List academic years
- `POST /academic-years` - Create academic year (admin)

### Timetables
- `GET /timetables/academic-year/:academicYearId` - Bảng tổng (overview)
- `GET /timetables/class/:classId` - TKB từng lớp
- `POST /timetables` - Create timetable entry (scheduler)
- `PUT /timetables/:id` - Update timetable entry (scheduler)
- `DELETE /timetables/:id` - Delete timetable entry (scheduler)

### Master Data
- `GET /classes`, `POST /classes`, `PUT /classes/:id`, `DELETE /classes/:id`
- `GET /subjects`, `POST /subjects`
- `GET /teachers`, `POST /teachers`
- `GET /rooms`, `POST /rooms`
- `GET /time-slots` (read-only)

## 🧪 Testing

### Backend Unit Tests
```bash
cd backend
npm run test
npm run test:cov     # With coverage
```

### Manual E2E Testing
1. Register new user (test@test.com / password123)
2. Login
3. Navigate to bảng tổng
4. Click cell → Select subject → Save
5. Verify TKB lớp updates automatically

## 🚢 Deployment

### Backend (Heroku/Railway)
```bash
cd backend
git push heroku main    # Or railway equivalent
```

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📋 Implementation Plan

**Phase 1 - Core MVP** (Current)
- Steps 1-18
- Duration: ~2-3 weeks
- Status: In Progress

**Phase 2 - Rules & Validation** (Future)
- CurriculumRule engine
- Conflict detection
- Period counting & verification
- Rule severity levels

**Phase 3 - Management** (Future)
- User management
- Draft/Publish workflow
- Versioning & audit logs

**Phase 4 - Export** (Future)
- Excel export (overview, per-class, per-teacher)
- PDF export
- Print functionality

**Phase 5 - Advanced** (Future)
- Automatic scheduling algorithm
- Scheduling suggestions
- Advanced reports

## 📖 Documentation

- [Project Prompt](./.github/docs/timetable_school_project_prompt.md) - Business requirements & architecture
- [Phase 1 Plan](./.github/docs/phase-1-implementation-plan.md) - Detailed implementation steps
- [API Spec](./docs/API.md) - API endpoints (to be created)
- [Database Schema](./docs/DATABASE.md) - MongoDB schemas (to be created)

## 👥 Team

- **Backend**: NestJS + MongoDB
- **Frontend**: Next.js + Tailwind CSS
- **Database**: MongoDB Atlas (Cloud)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📄 License

(Add your license here)

## 📞 Contact

(Add contact info here)

---

**Last Updated**: 2026-08-17  
**Current Phase**: 1 - Core MVP  
**Status**: Initializing Project Structure
