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
import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('time-slots')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimeSlotController {
  constructor(private timeSlotService: TimeSlotService) {}

  @Post()
  @Roles('ADMIN')
  async create(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotService.create(createTimeSlotDto);
  }

  @Get()
  async findAll(@Query('session') session?: string) {
    if (session) {
      return this.timeSlotService.findBySession(session);
    }
    return this.timeSlotService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.timeSlotService.findById(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateTimeSlotDto: UpdateTimeSlotDto,
  ) {
    return this.timeSlotService.update(id, updateTimeSlotDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    return this.timeSlotService.remove(id);
  }
}