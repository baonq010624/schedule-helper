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
import { AcademicYearService } from './academic-year.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('academic-years')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AcademicYearController {
  constructor(private academicYearService: AcademicYearService) {}

  @Post()
  @Roles('ADMIN')
  async create(@Body() createAcademicYearDto: CreateAcademicYearDto) {
    return this.academicYearService.create(createAcademicYearDto);
  }

  @Get()
  async findAll(@Query('schoolId') schoolId?: string) {
    if (schoolId) {
      return this.academicYearService.findBySchool(schoolId);
    }
    return this.academicYearService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.academicYearService.findById(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateAcademicYearDto: UpdateAcademicYearDto,
  ) {
    return this.academicYearService.update(id, updateAcademicYearDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    return this.academicYearService.remove(id);
  }
}
