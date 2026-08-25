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
import { CurriculumRuleService } from './curriculum-rule.service';
import { CreateCurriculumRuleDto } from './dto/create-curriculum-rule.dto';
import { UpdateCurriculumRuleDto } from './dto/update-curriculum-rule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('curriculum-rules')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CurriculumRuleController {
  constructor(private curriculumRuleService: CurriculumRuleService) {}

  @Post()
  @Roles('ADMIN', 'SCHEDULER')
  async create(@Body() dto: CreateCurriculumRuleDto) {
    return this.curriculumRuleService.create(dto);
  }

  @Get()
  async findAll(
    @Query('academicYearId') academicYearId?: string,
    @Query('classId') classId?: string,
    @Query('grade') grade?: string,
    @Query('subjectId') subjectId?: string,
  ) {
    return this.curriculumRuleService.findAll({
      academicYearId,
      classId,
      grade: grade !== undefined ? Number(grade) : undefined,
      subjectId,
    });
  }

  // Đếm số tiết đã xếp vs yêu cầu cho một lớp
  @Get('report/:classId')
  async getClassReport(@Param('classId') classId: string) {
    return this.curriculumRuleService.getClassReport(classId);
  }

  // Gợi ý tự động điền chỗ trống dựa trên số tiết còn thiếu
  @Post('auto-fill/:classId')
  @Roles('ADMIN', 'SCHEDULER')
  async autoFill(@Param('classId') classId: string) {
    return this.curriculumRuleService.autoFillClass(classId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.curriculumRuleService.findById(id);
  }

  @Put(':id')
  @Roles('ADMIN', 'SCHEDULER')
  async update(@Param('id') id: string, @Body() dto: UpdateCurriculumRuleDto) {
    return this.curriculumRuleService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SCHEDULER')
  async remove(@Param('id') id: string) {
    return this.curriculumRuleService.remove(id);
  }
}
