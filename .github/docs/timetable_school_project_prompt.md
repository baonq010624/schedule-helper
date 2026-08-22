# Prompt định hướng dự án --- Hệ thống quản lý và xếp thời khóa biểu

## 1. Bối cảnh dự án

Tôi đang phát triển một web application hỗ trợ nhà trường và giáo viên
quản lý, xây dựng và theo dõi thời khóa biểu.

Ý tưởng ban đầu xuất phát từ cách nhà trường đang làm thời khóa biểu
bằng Excel. Hệ thống web cần giữ được trải nghiệm dạng bảng giống Excel,
nhưng dữ liệu phải được quản lý có cấu trúc để có thể:

-   Nhập/sửa thời khóa biểu trực tiếp trên bảng tổng.
-   Tự động sinh thời khóa biểu riêng cho từng lớp.
-   Quản lý lớp, môn học, giáo viên, phòng học, khung giờ.
-   Đếm số tiết theo môn và kiểm tra yêu cầu chương trình.
-   Phát hiện các xung đột trong thời khóa biểu.
-   Phân quyền người dùng.
-   Xuất dữ liệu ra Excel/PDF về sau.
-   Có khả năng mở rộng thành hệ thống hỗ trợ/tự động xếp thời khóa
    biểu.

Đây là một dự án được định hướng phát triển lâu dài. Không nên chỉ xây
dựng như một "bảng Excel online", mà cần thiết kế dữ liệu và business
logic đúng ngay từ đầu.

------------------------------------------------------------------------

# 2. Nguyên tắc kiến trúc quan trọng nhất

## Không lưu riêng "bảng tổng" và "thời khóa biểu từng lớp"

Bảng tổng và bảng thời khóa biểu từng lớp chỉ là **hai cách hiển thị của
cùng một nguồn dữ liệu**.

Nguồn dữ liệu trung tâm là các `TimetableEntry`.

Ví dụ:

``` text
TimetableEntry
- academicYearId
- classId
- subjectId
- teacherId
- dayOfWeek
- timeSlotId
- roomId
- note
```

Một entry có thể biểu diễn:

``` text
Thứ Hai
Tiết 1
Lớp 1A
Môn Toán
Giáo viên A
```

Từ cùng entry đó:

-   Bảng tổng hiển thị theo các cột lớp.
-   TKB lớp 1A hiển thị theo các ngày trong tuần.
-   TKB giáo viên về sau có thể hiển thị theo giáo viên.
-   TKB phòng học về sau có thể hiển thị theo phòng.

**Không tạo collection/table riêng cho từng lớp và không duplicate dữ
liệu TKB.**

Một ô trên UI chỉ là cách biểu diễn một `TimetableEntry`, không phải bản
thân dữ liệu.

------------------------------------------------------------------------

# 3. Giao diện chính

## 3.1. Bảng tổng

Bảng tổng mô phỏng cách làm trên Excel.

Cấu trúc:

-   Cột dọc bên trái:
    -   Thứ Hai
    -   Thứ Ba
    -   Thứ Tư
    -   Thứ Năm
    -   Thứ Sáu
-   Trong mỗi ngày:
    -   Buổi sáng
    -   Buổi chiều
-   Trong mỗi buổi:
    -   Các tiết học theo khung giờ.
-   Cột ngang:
    -   Các lớp, được nhóm theo khối.
    -   Ví dụ:
        -   1A
        -   1B
        -   1C
        -   1D
        -   2A
        -   2B
        -   3A
        -   3B
        -   ...

Ví dụ concept:

``` text
             KHỐI 1                  KHỐI 2
        1A   1B   1C   1D      2A   2B   2C
T2
 Sáng
  Tiết 1   Toán TV   AN   ...   ...
  Tiết 2   TV   Toán ...
  Tiết 3   ...
  Nghỉ
  Tiết 4   ...
  Tiết 5   ...

 Chiều
  Tiết 1   ...
```

### Tương tác

Người dùng click vào một ô.

Ví dụ:

``` text
Thứ Hai → Sáng → Tiết 1 → lớp 1A
```

Sau đó chọn môn.

Không nên yêu cầu người dùng nhập chuỗi tự do nếu có thể tránh được. Nên
có:

-   Dropdown/search.
-   Autocomplete.
-   Chọn môn từ danh sách Subject.
-   Có thể hiển thị mã viết tắt của môn trong ô.

Ví dụ:

``` text
Toán
TV
AN
GDTC
TNXH
...
```

Sau khi lưu, dữ liệu được ghi vào `TimetableEntry`.

------------------------------------------------------------------------

# 4. Bảng thời khóa biểu theo lớp

Mỗi lớp có một view TKB riêng.

Ví dụ chọn:

``` text
Lớp 1A
```

sẽ hiển thị:

``` text
             Thứ 2    Thứ 3    Thứ 4    Thứ 5    Thứ 6
Sáng
 Tiết 1      Toán     TV       AN       Toán     TV
 Tiết 2      TV       Toán     TV       GDTC     Toán
 Tiết 3      AN       TV       Toán     TV       AN
 Nghỉ
 Tiết 4      ...
 Tiết 5      ...

Chiều
 Tiết 1      ...
 ...
```

Dữ liệu được query từ `TimetableEntry` với `classId`.

Khi sửa bảng tổng:

``` text
1A / Thứ Hai / Tiết 1 = Toán
```

thì TKB 1A phải tự động phản ánh thay đổi.

Không có bước đồng bộ thủ công.

------------------------------------------------------------------------

# 5. Mô hình dữ liệu dự kiến

Nếu sử dụng stack quen thuộc của dự án, có thể hướng tới:

-   Frontend: Next.js
-   Backend: NestJS
-   Database: MongoDB

Tuy nhiên đây là định hướng, không phải yêu cầu cứng nếu agent có lý do
kỹ thuật tốt hơn.

## Entity/collection chính

### School

``` text
School
- id
- name
- address
- ...
```

### AcademicYear

``` text
AcademicYear
- id
- schoolId
- name
- startDate
- endDate
- isActive
```

Ví dụ:

``` text
2026-2027
2027-2028
```

Không được để dữ liệu của các năm học ghi đè lẫn nhau.

### Class

``` text
Class
- id
- academicYearId
- grade
- name
- roomId
- status
```

Ví dụ:

``` text
1A
1B
1C
2A
2B
...
```

### Subject

``` text
Subject
- id
- code
- name
- shortName
- ...
```

Ví dụ:

``` text
TOAN
Toán
T

TV
Tiếng Việt
TV

GDTC
Giáo dục thể chất
GDTC
```

Không lưu trực tiếp tên môn vào mỗi ô TKB nếu có thể dùng `subjectId`.

### Teacher

``` text
Teacher
- id
- name
- code
- email
- department
- status
```

### Room

Có thể bổ sung:

``` text
Room
- id
- name
- capacity
- type
- status
```

Ví dụ:

``` text
Phòng 101
Phòng Tin học
Phòng Âm nhạc
...
```

### TimeSlot

Không hard-code giờ học trong frontend.

``` text
TimeSlot
- id
- session
- period
- startTime
- endTime
- type
- order
```

Ví dụ:

``` text
Sáng - Tiết 1 - 07:00 - 07:35
Sáng - Tiết 2 - 07:40 - 08:15
Sáng - Tiết 3 - 08:20 - 08:55
Sáng - Giải lao
Sáng - Tiết 4 - 09:20 - 09:55
Sáng - Tiết 5 - 10:00 - 10:35
```

Buổi chiều có cấu hình riêng.

Trường khác có thể dùng giờ/tiết khác mà không cần sửa source code.

### TimetableEntry

Đây là entity trung tâm.

``` text
TimetableEntry
- id
- academicYearId
- classId
- subjectId
- teacherId
- dayOfWeek
- timeSlotId
- roomId
- note
```

Có thể bổ sung các metadata cần thiết khi nghiệp vụ rõ hơn.

------------------------------------------------------------------------

# 6. Quy tắc quan trọng: Không hard-code quy định của trường

Nhà trường có thể thay đổi:

-   Số tiết một môn mỗi tuần.
-   Số tiết tối đa một môn trong ngày.
-   Môn nào áp dụng cho khối nào.
-   Môn bắt buộc/tự chọn.
-   Số ngày học.
-   Khung giờ.
-   Số tiết sáng/chiều.
-   Giáo viên có thể/không thể dạy thời điểm nào.
-   Phòng nào được dùng cho môn nào.
-   Các yêu cầu đặc thù khác.

Những thông tin này phải được thiết kế dưới dạng **configuration/rules
trong database**.

Không viết kiểu:

``` text
if subject == "Toán":
    requiredPeriods = 5
```

hoặc:

``` text
GRADE_1_MATH_PERIODS = 5
```

trong business logic.

------------------------------------------------------------------------

# 7. CurriculumRule

Một hướng thiết kế:

``` text
CurriculumRule
- id
- academicYearId
- grade
- classId?             // optional, dùng cho trường hợp đặc biệt
- subjectId
- requiredPeriodsPerWeek
- minPeriodsPerDay?
- maxPeriodsPerDay?
- minConsecutivePeriods?
- maxConsecutivePeriods?
- isRequired
- ...
```

Ví dụ:

``` text
Khối 1
Toán
5 tiết/tuần
tối đa 2 tiết/ngày
bắt buộc
```

Nếu năm học khác thay đổi:

``` text
2026-2027 → Toán = 5
2027-2028 → Toán = 6
```

Không sửa code.

------------------------------------------------------------------------

# 8. Rule có phạm vi áp dụng

Một quy định có thể áp dụng ở nhiều cấp:

``` text
School
  ↓
Grade
  ↓
Class
```

Ví dụ:

-   Toàn trường: Toán có quy định A.
-   Khối 1: Toán có quy định B.
-   Lớp 1A đặc biệt: Toán có quy định C.

Rule cụ thể hơn có thể override rule tổng quát.

Cần xác định precedence rõ ràng khi triển khai.

------------------------------------------------------------------------

# 9. Rule không chỉ có số tiết

Có thể có nhiều loại rule:

## Curriculum Rules

-   Số tiết/tuần.
-   Số tiết tối thiểu/ngày.
-   Số tiết tối đa/ngày.
-   Tiết liên tiếp tối thiểu/tối đa.
-   Môn bắt buộc/tự chọn.
-   Môn áp dụng cho khối/lớp.

## Teacher Rules

-   Giáo viên không dạy được ngày nào.
-   Không dạy được tiết nào.
-   Số tiết tối đa/ngày.
-   Các khoảng thời gian unavailable.

## Class Rules

-   Số tiết tối đa/ngày.
-   Các tiết/ngày bị giới hạn.
-   Các khoảng thời gian không thể học.

## Room Rules

-   Sức chứa.
-   Loại phòng.
-   Môn được phép sử dụng.
-   Thời gian phòng unavailable.

## General School Rules

-   Số ngày học.
-   Buổi sáng/chiều.
-   Số tiết mỗi buổi.
-   Giờ bắt đầu/kết thúc.
-   Giờ giải lao.

------------------------------------------------------------------------

# 10. Ba tầng quy tắc

Nên phân biệt rõ:

## 10.1. System Rules

Các invariant bảo đảm tính đúng đắn của hệ thống.

Ví dụ:

-   Một lớp không thể có hai môn cùng một thời điểm.
-   Một giáo viên không thể dạy hai lớp cùng một thời điểm nếu cùng áp
    dụng quy tắc giáo viên duy nhất.
-   Một entry phải tham chiếu đến các entity hợp lệ.

Các rule này không nên cho admin tắt tùy tiện.

## 10.2. School Rules

Do nhà trường cấu hình.

Ví dụ:

-   Toán tối đa 2 tiết/ngày.
-   Khối 1 phải học 5 tiết Toán/tuần.

## 10.3. Scheduling Preferences

Sở thích/ưu tiên của người xếp TKB.

Ví dụ:

-   Ưu tiên môn chính vào buổi sáng.
-   Hạn chế 3 tiết cùng môn trong ngày.
-   Ưu tiên một môn ở tiết 1-2.

Preferences có thể được dùng để chấm điểm/đánh giá lịch, đặc biệt nếu
sau này xây dựng tính năng tự động xếp TKB.

------------------------------------------------------------------------

# 11. Mức độ cảnh báo của Rule

Không phải vi phạm nào cũng nhất thiết là lỗi chặn thao tác.

Nên hỗ trợ:

### ERROR

Không cho lưu hoặc không cho publish.

Ví dụ:

``` text
Giáo viên A đang dạy hai lớp cùng lúc.
```

### WARNING

Cho phép tiếp tục nhưng cảnh báo.

Ví dụ:

``` text
Lớp 1A có 3 tiết Toán trong cùng một ngày,
vượt khuyến nghị 2 tiết/ngày.
```

### INFO

Chỉ thông báo.

Ví dụ:

``` text
Tiết Toán được xếp vào buổi chiều.
```

Một Rule có thể có:

``` text
severity:
- ERROR
- WARNING
- INFO
```

------------------------------------------------------------------------

# 12. Đếm tiết và kiểm tra chương trình

Đây là chức năng quan trọng.

Ví dụ lớp 1A:

  Môn            Yêu cầu   Đã xếp Trạng thái
  ------------ --------- -------- ------------
  Toán                 5        5 Đạt
  Tiếng Việt          10        9 Thiếu
  TNXH                 2        2 Đạt
  GDTC                 2        3 Thừa
  Âm nhạc              1        1 Đạt

Số liệu "Yêu cầu" phải lấy từ `CurriculumRule`, không hard-code.

Hệ thống có thể:

-   Đếm số tiết đã xếp.
-   So sánh với required periods.
-   Phát hiện thiếu/thừa.
-   Hiển thị cảnh báo.
-   Có thể kiểm tra theo lớp, khối, môn, giáo viên.

------------------------------------------------------------------------

# 13. Conflict Detection

Đây là một trong những tính năng quan trọng nhất.

## Class conflict

Không được:

``` text
1A
Thứ Hai
Tiết 1
Toán
```

và đồng thời:

``` text
1A
Thứ Hai
Tiết 1
Tiếng Việt
```

## Teacher conflict

Không được:

``` text
GV A
Thứ Hai
Tiết 1
1A
```

và:

``` text
GV A
Thứ Hai
Tiết 1
1B
```

## Room conflict

Không được:

``` text
Phòng Tin
Thứ Hai
Tiết 2
1A
```

và:

``` text
Phòng Tin
Thứ Hai
Tiết 2
1B
```

Backend phải kiểm tra conflict. Không chỉ dựa vào frontend.

Nên sử dụng unique/index/database constraint ở những nơi phù hợp để bảo
vệ tính toàn vẹn dữ liệu.

------------------------------------------------------------------------

# 14. Draft / Published

Nên hỗ trợ trạng thái của thời khóa biểu.

Ví dụ:

``` text
DRAFT
  ↓
VALIDATING
  ↓
READY / HAS_WARNINGS / HAS_ERRORS
  ↓
PUBLISHED
```

Ý tưởng:

-   Người xếp TKB có thể thử nghiệm trong Draft.
-   TKB Draft không nhất thiết là TKB chính thức.
-   Sau khi kiểm tra, người có quyền mới Publish.
-   TKB Published là phiên bản được sử dụng chính thức.

------------------------------------------------------------------------

# 15. Versioning

Nên cân nhắc version ngay từ thiết kế.

Ví dụ:

``` text
Version 1
Ngày tạo: 16/08/2026

Version 2
Ngày tạo: 20/08/2026
Lý do: Giáo viên thay đổi lịch
```

Mục tiêu:

-   Theo dõi lịch sử.
-   Biết ai thay đổi.
-   Có thể xem lại phiên bản cũ.
-   Có thể rollback khi cần.

------------------------------------------------------------------------

# 16. Phân quyền

Các role dự kiến:

## Admin

-   Quản lý trường.
-   Năm học.
-   Lớp.
-   Môn.
-   Giáo viên.
-   Phòng.
-   Khung giờ.
-   Rules.
-   Người dùng.
-   Phân quyền.

## Scheduler / Timetable Manager

-   Tạo/sửa/xóa TKB.
-   Kiểm tra conflict.
-   Xem thống kê số tiết.
-   Validate.
-   Export.
-   Publish nếu được cấp quyền.

## Teacher

-   Xem TKB của mình.
-   Xem TKB lớp được phép.
-   Không tự ý sửa TKB.

## Viewer

-   Chỉ xem các TKB được cấp quyền.

Role thực tế có thể thay đổi theo nhu cầu.

------------------------------------------------------------------------

# 17. Export

Về sau cần hỗ trợ:

## Excel bảng tổng

Giống layout Excel hiện tại:

``` text
Thứ
Buổi
Tiết
Các lớp
```

## Excel từng lớp

``` text
        Thứ 2   Thứ 3   Thứ 4   Thứ 5   Thứ 6
Tiết 1
Tiết 2
...
```

## Excel giáo viên

``` text
        Thứ 2   Thứ 3   Thứ 4   Thứ 5   Thứ 6
Tiết 1
Tiết 2
...
```

## Có thể mở rộng

-   PDF.
-   In trực tiếp.
-   TKB phòng.
-   Báo cáo số tiết.
-   Báo cáo conflict.

Tất cả phải lấy từ cùng một nguồn `TimetableEntry`.

------------------------------------------------------------------------

# 18. Kiến trúc backend định hướng

Nếu dùng NestJS:

``` text
src/
├── auth/
├── users/
├── schools/
├── academic-years/
├── classes/
├── teachers/
├── subjects/
├── rooms/
├── time-slots/
├── curriculum/
├── timetable-rules/
├── timetables/
├── validation/
├── exports/
└── audit/
```

Có thể bắt đầu bằng modular monolith.

**Không cần microservice ngay từ đầu.**

Nếu dự án phát triển đủ lớn mới xem xét tách service.

------------------------------------------------------------------------

# 19. Kiến trúc frontend định hướng

Có thể tổ chức theo domain:

``` text
app/
├── auth/
├── dashboard/
├── timetable/
│   ├── overview/
│   ├── classes/
│   ├── teachers/
│   └── rooms/
├── classes/
├── teachers/
├── subjects/
├── rooms/
├── settings/
│   ├── academic-year/
│   ├── time-slots/
│   ├── curriculum/
│   └── rules/
└── reports/
```

Bảng TKB cần được thiết kế như một component dữ liệu tương tác, không
phải một HTML table khổng lồ hard-code.

------------------------------------------------------------------------

# 20. Multi-year và khả năng mở rộng

Dữ liệu phải gắn với `academicYearId` ở những entity phụ thuộc năm học.

Không được giả định:

``` text
1A luôn tồn tại vĩnh viễn.
```

Thực tế:

``` text
2025-2026:
1A → một nhóm học sinh

2026-2027:
1A → nhóm học sinh khác
```

Tương tự chương trình/rules có thể thay đổi theo năm.

------------------------------------------------------------------------

# 21. MVP đề xuất

Không làm tất cả cùng lúc.

## Phase 1 --- Core MVP

-   Authentication cơ bản.
-   School.
-   Academic Year.
-   Class.
-   Subject.
-   TimeSlot.
-   TimetableEntry.
-   Bảng tổng.
-   Chọn môn trong ô.
-   TKB từng lớp.
-   Thêm/xóa lớp.
-   Lưu database.

Mục tiêu:

> Có thể sử dụng web thay cho bảng Excel cơ bản.

## Phase 2 --- Rules & Validation

-   CurriculumRule.
-   Đếm tiết.
-   Kiểm tra thiếu/thừa.
-   Class conflict.
-   Teacher conflict.
-   Room conflict.
-   Rule severity.
-   Teacher availability.
-   Class constraints.

## Phase 3 --- Management

-   Teacher management.
-   Room management.
-   User roles.
-   Draft/Publish.
-   Versioning.
-   Audit log.

## Phase 4 --- Export

-   Excel tổng.
-   Excel từng lớp.
-   Excel giáo viên.
-   PDF.
-   Print.

## Phase 5 --- Advanced Scheduling

Nghiên cứu thuật toán tự động/đề xuất xếp TKB.

------------------------------------------------------------------------

# 22. Tầm nhìn dài hạn

Hệ thống có thể phát triển từ:

``` text
Web làm thời khóa biểu
```

thành:

``` text
School Timetable Management System
```

và cuối cùng:

``` text
School Timetable Optimization System
```

Ở phiên bản nâng cao, người quản trị cung cấp:

``` text
Classes
Teachers
Subjects
Rooms
TimeSlots
Curriculum Rules
Teacher Availability
Room Constraints
Class Constraints
School Rules
Scheduling Preferences
```

Sau đó hệ thống có thể đề xuất lịch.

Cần phân biệt:

### Hard constraints

Bắt buộc phải thỏa mãn:

-   Không trùng lớp.
-   Không trùng giáo viên.
-   Không trùng phòng.
-   Đủ số tiết bắt buộc.
-   Các constraint bắt buộc khác.

### Soft constraints

Ưu tiên nhưng có thể vi phạm:

-   Ưu tiên môn chính buổi sáng.
-   Hạn chế cùng môn quá nhiều trong ngày.
-   Ưu tiên một số giáo viên/tiết.
-   Các preference khác.

Có thể dùng scoring/optimization để tìm lịch tốt nhất.

**Không triển khai thuật toán tự động ngay trong MVP. Chỉ thiết kế dữ
liệu hiện tại sao cho không cản trở tính năng này về sau.**

------------------------------------------------------------------------

# 23. Nguyên tắc thiết kế cần giữ xuyên suốt

1.  **Không hard-code dữ liệu nghiệp vụ có thể thay đổi.**
2.  **Không duplicate dữ liệu giữa bảng tổng và TKB lớp.**
3.  `TimetableEntry` là nguồn dữ liệu trung tâm.
4.  Configuration/Rules phải được lưu có version theo năm học khi cần.
5.  Backend chịu trách nhiệm bảo vệ business rules và data integrity.
6.  Frontend chịu trách nhiệm trải nghiệm nhập/sửa dữ liệu.
7.  Các rule của trường phải có khả năng thay đổi mà không cần deploy
    code mới.
8.  Phân biệt System Rules, School Rules và Scheduling Preferences.
9.  Phân biệt ERROR, WARNING và INFO.
10. Thiết kế cho năm học/học kỳ thay vì chỉ một TKB duy nhất.
11. Ưu tiên modular monolith cho giai đoạn đầu.
12. Không over-engineer MVP.
13. Thiết kế database để sau này có thể hỗ trợ teacher timetable, room
    timetable, export và automatic scheduling.
14. Khi chưa rõ nghiệp vụ, không tự ý hard-code giả định; nên xác định
    requirement trước.
15. TKB chính thức phải có trạng thái/version rõ ràng nếu hệ thống bắt
    đầu được sử dụng thực tế.

------------------------------------------------------------------------

# 24. Tóm tắt dự án cho Agent

Hãy coi đây là một hệ thống quản lý thời khóa biểu cho nhà trường, lấy
trải nghiệm Excel làm nền tảng UI nhưng sử dụng dữ liệu có cấu trúc và
business rules rõ ràng.

**Core concept:**

``` text
School
  ↓
Academic Year
  ↓
Classes / Subjects / Teachers / Rooms / TimeSlots
  ↓
Rules & Curriculum
  ↓
TimetableEntry
  ↓
┌──────────────────────────────┐
│ Tổng TKB                     │
│ TKB từng lớp                 │
│ TKB giáo viên                │
│ TKB phòng                    │
│ Reports / Excel / PDF        │
└──────────────────────────────┘
```

Bảng tổng và các bảng TKB khác nhau chỉ là các **views** trên cùng dữ
liệu.

Hệ thống phải được thiết kế theo hướng **configuration-driven**, nghĩa
là các quy định thay đổi của trường phải được cấu hình bằng dữ liệu thay
vì hard-code.

MVP trước hết cần giải quyết tốt:

> **Nhập môn vào ô của bảng tổng → lưu TimetableEntry → TKB lớp tương
> ứng tự động cập nhật.**

Sau đó mới mở rộng sang:

> **Rules → Validation → Conflict Detection → Statistics → Roles →
> Versioning → Export → Automatic Scheduling.**

Khi triển khai, ưu tiên tính đúng đắn của domain model và data integrity
trước việc làm UI quá phức tạp.
