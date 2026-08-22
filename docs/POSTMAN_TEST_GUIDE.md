# Schedule Helper - Complete API Testing Guide

## 🔑 Authentication

### 1. POST /auth/register
**Description:** Đăng ký user mới
**Body:**
```json
{
  "email": "user@test.com",
  "password": "Test123456",
  "name": "Test User"
}
```
**Expected Response:** 200
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "xxx",
    "email": "user@test.com",
    "name": "Test User",
    "role": "VIEWER"
  }
}
```

### 2. POST /auth/login
**Description:** Đăng nhập
**Body:**
```json
{
  "email": "user@test.com",
  "password": "Test123456"
}
```
**Expected Response:** 200 (same token response)

**Test Cases:**
- ✅ Đúng email/password → 200 + token
- ❌ Email không tồn tại → 401
- ❌ Password sai → 401
- ❌ Email trống → 400
- ❌ Password trống → 400

### 3. GET /auth/profile
**Description:** Lấy thông tin user hiện tại
**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**Expected Response:** 200
```json
{
  "_id": "xxx",
  "email": "user@test.com",
  "name": "Test User",
  "role": "VIEWER"
}
```

**Test Cases:**
- ✅ Có token hợp lệ → 200 + user data
- ❌ Không có token → 401
- ❌ Token sai/hết hạn → 401

---

## 🏫 Schools Module (5 endpoints)

### 4. POST /schools
**Description:** Tạo trường học mới (ADMIN only)
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```
**Body:**
```json
{
  "name": "Trường Tiểu Học XYZ",
  "address": "123 Đường ABC, TP Hà Nội"
}
```
**Expected Response:** 201
```json
{
  "_id": "new_id",
  "name": "Trường Tiểu Học XYZ",
  "address": "123 Đường ABC, TP Hà Nội",
  "isActive": true
}
```

**Test Cases:**
- ✅ ADMIN role → 201
- ❌ VIEWER role → 403
- ❌ Không name → 400
- ❌ Không token → 401

### 5. GET /schools
**Description:** Lấy tất cả trường học
**Headers:**
```
Authorization: Bearer {token}
```
**Expected Response:** 200
```json
[
  {
    "_id": "xxx",
    "name": "Trường Tiểu Học ABC",
    "address": "...",
    "isActive": true
  }
]
```

**Test Cases:**
- ✅ Với token hợp lệ → 200 + danh sách
- ✅ Danh sách trống → 200 + []
- ❌ Không token → 401

### 6. GET /schools/:id
**Description:** Lấy chi tiết trường học
**Headers:**
```
Authorization: Bearer {token}
```
**Expected Response:** 200
```json
{
  "_id": "xxx",
  "name": "Trường Tiểu Học ABC",
  "address": "...",
  "isActive": true
}
```

**Test Cases:**
- ✅ ID tồn tại → 200
- ❌ ID không tồn tại → 404
- ❌ ID invalid → 400

### 7. PUT /schools/:id
**Description:** Cập nhật trường học (ADMIN only)
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```
**Body:**
```json
{
  "name": "Trường Tiểu Học ABC (Updated)",
  "address": "456 Đường XYZ"
}
```
**Expected Response:** 200

**Test Cases:**
- ✅ ADMIN + ID tồn tại → 200
- ❌ VIEWER → 403
- ❌ ID không tồn tại → 404

### 8. DELETE /schools/:id
**Description:** Xóa trường học (ADMIN only)
**Headers:**
```
Authorization: Bearer {token}
```
**Expected Response:** 200

**Test Cases:**
- ✅ ADMIN + ID tồn tại → 200
- ❌ VIEWER → 403
- ❌ ID không tồn tại → 404

---

## 📅 Academic Years Module (5 endpoints)

### 9. POST /academic-years
**Description:** Tạo năm học mới
**Headers:**
```
Authorization: Bearer {token}
```
**Body:**
```json
{
  "schoolId": "school_id",
  "name": "2027-2028",
  "startDate": "2027-09-01",
  "endDate": "2028-06-30"
}
```
**Expected Response:** 201

**Test Cases:**
- ✅ Dữ liệu đầy đủ → 201
- ❌ Không schoolId → 400
- ❌ startDate > endDate → 400

### 10. GET /academic-years
**Description:** Lấy tất cả năm học
**Headers:**
```
Authorization: Bearer {token}
```
**Query Params (tùy chọn):**
```
?schoolId=xxx
```
**Expected Response:** 200 (array with populated schoolId)

**Test Cases:**
- ✅ Không filter → Tất cả năm học
- ✅ ?schoolId=xxx → Chỉ năm học của trường đó
- ✅ Populate schoolId → Trả về school object

### 11. GET /academic-years/:id
**Expected Response:** 200 + populated schoolId

### 12. PUT /academic-years/:id
**Body:**
```json
{
  "name": "2027-2028 (Updated)",
  "endDate": "2028-07-15"
}
```

### 13. DELETE /academic-years/:id

---

## 👥 Classes Module (5 endpoints)

### 14. POST /classes
**Body:**
```json
{
  "academicYearId": "year_id",
  "grade": "1",
  "name": "1A",
  "roomId": "room_id"
}
```
**Expected Response:** 201

**Test Cases:**
- ✅ Đầy đủ dữ liệu → 201
- ❌ Không academicYearId → 400
- ✅ roomId tùy chọn → 201

### 15. GET /classes
**Query Params:**
```
?academicYearId=xxx
```
**Populate:** academicYearId, roomId

### 16. GET /classes/:id
**Populate:** academicYearId, roomId

### 17. PUT /classes/:id
**Body:**
```json
{
  "name": "1A (Updated)",
  "roomId": "new_room_id"
}
```

### 18. DELETE /classes/:id

---

## 📖 Subjects Module (5 endpoints)

### 19. POST /subjects
**Body:**
```json
{
  "code": "TOAN",
  "name": "Toán Học",
  "shortName": "TOAN"
}
```

**Test Cases:**
- ✅ Code unique → 201
- ❌ Code trùng → 400 (duplicate key)
- ❌ Không code → 400

### 20. GET /subjects
**Expected:** Danh sách tất cả môn học

### 21. GET /subjects/:id

### 22. PUT /subjects/:id
**Body:**
```json
{
  "name": "Toán Học (Updated)"
}
```

### 23. DELETE /subjects/:id

---

## 👨‍🏫 Teachers Module (5 endpoints)

### 24. POST /teachers
**Body:**
```json
{
  "name": "Cô Thúy",
  "code": "GV001",
  "email": "thuy@school.edu.vn",
  "department": "Toán"
}
```

**Test Cases:**
- ✅ Dữ liệu đầy đủ → 201
- ❌ Code trùng → 400
- ❌ Email trùng → 400
- ❌ Không name → 400

### 25. GET /teachers
**Expected:** Danh sách giáo viên

### 26. GET /teachers/:id

### 27. PUT /teachers/:id
**Body:**
```json
{
  "name": "Cô Thúy (Updated)",
  "department": "Toán & Khoa Học"
}
```

### 28. DELETE /teachers/:id

---

## 🚪 Rooms Module (5 endpoints)

### 29. POST /rooms
**Body:**
```json
{
  "name": "Phòng 101",
  "capacity": 35,
  "type": "CLASSROOM"
}
```

**Test Cases:**
- ✅ Type: CLASSROOM/LAB/GYM → 201
- ❌ Capacity <= 0 → 400
- ❌ Type invalid → 400

### 30. GET /rooms

### 31. GET /rooms/:id

### 32. PUT /rooms/:id
**Body:**
```json
{
  "capacity": 40,
  "type": "LAB"
}
```

### 33. DELETE /rooms/:id

---

## ⏰ Time Slots Module (5 endpoints)

### 34. POST /time-slots
**Body:**
```json
{
  "session": "MORNING",
  "period": 1,
  "startTime": "07:00",
  "endTime": "07:35",
  "type": "CLASS",
  "order": 1
}
```

**Test Cases:**
- ✅ Session: MORNING/AFTERNOON → 201
- ✅ Type: CLASS/BREAK → 201
- ❌ Time format sai → 400

### 35. GET /time-slots
**Query Params:**
```
?session=MORNING
```
**Expected:** Sorted by order

### 36. GET /time-slots/:id

### 37. PUT /time-slots/:id

### 38. DELETE /time-slots/:id

---

## 📋 Timetable Entries Module (8 endpoints)

### 39. POST /timetable-entries
**Headers:**
```
Authorization: Bearer {token}
```
**Body:**
```json
{
  "academicYearId": "year_id",
  "classId": "class_id",
  "subjectId": "subject_id",
  "teacherId": "teacher_id",
  "dayOfWeek": "MONDAY",
  "timeSlotId": "slot_id",
  "roomId": "room_id",
  "note": "Tùy chọn"
}
```

**Test Cases:**
- ✅ ADMIN/SCHEDULER → 201
- ❌ VIEWER/TEACHER → 403
- ❌ dayOfWeek invalid (not MONDAY-FRIDAY) → 400
- ✅ teacherId & roomId tùy chọn → 201
- ⚠️ Cùng class/teacher/room cùng time → Nên reject (conflict)

### 40. GET /timetable-entries
**Query Params:**
```
?academicYearId=xxx
```
**Populate:** academicYearId, classId, subjectId, teacherId, timeSlotId, roomId
**Sort:** dayOfWeek, timeSlotId
**Expected:** Bảng tổng (tất cả entries)

**Test Cases:**
- ✅ Không filter → Tất cả
- ✅ ?academicYearId=xxx → Chỉ năm đó
- ✅ Trả về populated references
- ✅ Sorted by day and slot

### 41. GET /timetable-entries/class/:classId
**Query Params (tùy chọn):**
```
?dayOfWeek=MONDAY
```
**Expected:** TKB lớp (class timetable)

**Test Cases:**
- ✅ classId tồn tại → 200
- ✅ ?dayOfWeek=MONDAY → Chỉ ngày Thứ Hai
- ✅ Populated tất cả references
- ❌ classId không tồn tại → 404

### 42. GET /timetable-entries/teacher/:teacherId
**Query Params:**
```
?dayOfWeek=TUESDAY
```
**Expected:** TKB giáo viên (teacher timetable)

**Test Cases:**
- ✅ teacherId tồn tại → 200
- ✅ ?dayOfWeek=TUESDAY → Chỉ ngày Thứ Ba
- ✅ Populated tất cả references
- ❌ teacherId không tồn tại → 404

### 43. GET /timetable-entries/room/:roomId
**Query Params:**
```
?dayOfWeek=WEDNESDAY
```
**Expected:** TKB phòng (room timetable)

**Test Cases:**
- ✅ roomId tồn tại → 200
- ✅ ?dayOfWeek=WEDNESDAY → Chỉ ngày Thứ Tư
- ✅ Populated tất cả references
- ❌ roomId không tồn tại → 404

### 44. GET /timetable-entries/:id
**Expected:** Single entry with all populated fields

### 45. PUT /timetable-entries/:id
**Headers:**
```
Authorization: Bearer {token}
```
**Body:** (Có thể update một số field)
```json
{
  "subjectId": "new_subject_id",
  "roomId": "new_room_id"
}
```

**Test Cases:**
- ✅ ADMIN/SCHEDULER → 200
- ❌ VIEWER/TEACHER → 403
- ❌ ID không tồn tại → 404

### 46. DELETE /timetable-entries/:id
**Headers:**
```
Authorization: Bearer {token}
```

**Test Cases:**
- ✅ ADMIN/SCHEDULER → 200
- ❌ VIEWER/TEACHER → 403
- ❌ ID không tồn tại → 404

---

## 🧪 Testing Workflow

### Phase 1: Setup
1. Tạo user mới: `POST /auth/register`
2. Lấy token từ response
3. Lưu token vào Postman variable: `{{token}}`

### Phase 2: Master Data
1. Kiểm tra seeded data:
   - `GET /schools`
   - `GET /academic-years`
   - `GET /classes`
   - `GET /subjects`
   - `GET /teachers`
   - `GET /rooms`
   - `GET /time-slots`

2. Lưu ID của seeded items:
   ```
   schoolId: {{schoolId}}
   academicYearId: {{academicYearId}}
   classId: {{classId}}
   subjectId: {{subjectId}}
   teacherId: {{teacherId}}
   roomId: {{roomId}}
   timeSlotId: {{timeSlotId}}
   ```

### Phase 3: Timetable Entries
1. `POST /timetable-entries` - Tạo entry
2. `GET /timetable-entries` - Xem bảng tổng
3. `GET /timetable-entries/class/:classId` - Xem TKB lớp
4. `GET /timetable-entries/teacher/:teacherId` - Xem TKB giáo viên
5. `GET /timetable-entries/room/:roomId` - Xem TKB phòng
6. `PUT /timetable-entries/:id` - Cập nhật
7. `DELETE /timetable-entries/:id` - Xóa

### Phase 4: Role Testing
1. Tạo VIEWER user (default)
2. Thử `POST /timetable-entries` → 403
3. Thử `DELETE /schools/:id` → 403
4. Thử `GET /auth/profile` → 200

---

## 📝 Postman Environment Variables

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "baseUrl": "http://localhost:3000",
  "schoolId": "6a8464b72db5b625233840b7",
  "academicYearId": "6a8464b72db5b625233840b7",
  "classId": "6a8464b72db5b625233840b8",
  "classId2": "6a8464b72db5b625233840b9",
  "classId3": "6a8464b72db5b625233840ba",
  "subjectId": "6a8464b82db5b625233840bb",
  "teacherId": "6a8464b82db5b625233840c0",
  "roomId": "6a8464b82db5b625233840c5",
  "timeSlotId": "6a8464b82db5b625233840c9"
}
```

---

## 📊 Test Summary

| Category | Count | Status |
|----------|-------|--------|
| Authentication | 3 | ✅ Ready |
| Schools CRUD | 5 | ✅ Ready |
| Academic Years CRUD | 5 | ✅ Ready |
| Classes CRUD | 5 | ✅ Ready |
| Subjects CRUD | 5 | ✅ Ready |
| Teachers CRUD | 5 | ✅ Ready |
| Rooms CRUD | 5 | ✅ Ready |
| Time Slots CRUD | 5 | ✅ Ready |
| Timetable CRUD | 8 | ✅ Ready |
| **TOTAL** | **53** | **✅ Ready** |

---

## ⚡ Quick Commands

**Register & Login:**
```bash
POST /auth/register
{
  "email": "test@postman.com",
  "password": "Test123456",
  "name": "Postman Tester"
}

POST /auth/login
{
  "email": "test@postman.com",
  "password": "Test123456"
}
```

**Get All Seeded Data:**
```bash
GET /schools
GET /academic-years
GET /classes
GET /subjects
GET /teachers
GET /rooms
GET /time-slots
```

**Test Timetable Workflow:**
```bash
POST /timetable-entries (with all required fields)
GET /timetable-entries
GET /timetable-entries/class/{{classId}}
GET /timetable-entries/teacher/{{teacherId}}
GET /timetable-entries/room/{{roomId}}
PUT /timetable-entries/{{timetableId}}
DELETE /timetable-entries/{{timetableId}}
```
