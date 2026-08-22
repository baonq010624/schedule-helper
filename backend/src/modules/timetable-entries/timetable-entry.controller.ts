import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TimetableEntryService } from './timetable-entry.service';
import { CreateTimetableEntryDto } from './dto/create-timetable-entry.dto';
import { UpdateTimetableEntryDto } from './dto/update-timetable-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('timetable-entries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimetableEntryController {
  constructor(private timetableEntryService: TimetableEntryService) {}

  @Post()
  @Roles('ADMIN', 'SCHEDULER')
  async create(@Body() createTimetableEntryDto: CreateTimetableEntryDto) {
    return this.timetableEntryService.create(createTimetableEntryDto);
  }

  // Bảng tổng (Summary table) - all timetable entries
  @Get()
  async findAll(
    @Query('academicYearId') academicYearId?: string,
  ) {
    return this.timetableEntryService.findAll(academicYearId);
  }

  // TKB lớp (Class timetable) - entries for a specific class
  @Get('class/:classId')
  async findByClass(
    @Param('classId') classId: string,
    @Query('dayOfWeek') dayOfWeek?: string,
  ) {
    return this.timetableEntryService.findByClass(classId, dayOfWeek);
  }

  // TKB giáo viên (Teacher timetable) - entries for a specific teacher
  @Get('teacher/:teacherId')
  async findByTeacher(
    @Param('teacherId') teacherId: string,
    @Query('dayOfWeek') dayOfWeek?: string,
  ) {
    return this.timetableEntryService.findByTeacher(teacherId, dayOfWeek);
  }

  // TKB phòng (Room timetable) - entries for a specific room
  @Get('room/:roomId')
  async findByRoom(
    @Param('roomId') roomId: string,
    @Query('dayOfWeek') dayOfWeek?: string,
  ) {
    return this.timetableEntryService.findByRoom(roomId, dayOfWeek);
  }

  // Get single entry by ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.timetableEntryService.findById(id);
  }

  @Put(':id')
  @Roles('ADMIN', 'SCHEDULER')
  async update(
    @Param('id') id: string,
    @Body() updateTimetableEntryDto: UpdateTimetableEntryDto,
  ) {
    return this.timetableEntryService.update(id, updateTimetableEntryDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SCHEDULER')
  async remove(@Param('id') id: string) {
    return this.timetableEntryService.remove(id);
  }
}
