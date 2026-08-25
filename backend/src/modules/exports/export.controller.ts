import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('exports')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private exportService: ExportService) {}

  private async send(res: Response, filename: string, workbook: any) {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    await workbook.xlsx.write(res);
    res.end();
  }

  @Get('master')
  async exportMaster(
    @Query('academicYearId') academicYearId: string | undefined,
    @Res() res: Response,
  ) {
    const workbook = await this.exportService.buildMasterWorkbook(academicYearId);
    await this.send(res, 'bang-tong-thoi-khoa-bieu.xlsx', workbook);
  }

  @Get('class/:classId')
  async exportClass(@Param('classId') classId: string, @Res() res: Response) {
    const workbook = await this.exportService.buildClassWorkbook(classId);
    await this.send(res, `tkb-lop-${classId}.xlsx`, workbook);
  }

  @Get('teacher/:teacherId')
  async exportTeacher(@Param('teacherId') teacherId: string, @Res() res: Response) {
    const workbook = await this.exportService.buildTeacherWorkbook(teacherId);
    await this.send(res, `tkb-giao-vien-${teacherId}.xlsx`, workbook);
  }

  @Get('room/:roomId')
  async exportRoom(@Param('roomId') roomId: string, @Res() res: Response) {
    const workbook = await this.exportService.buildRoomWorkbook(roomId);
    await this.send(res, `tkb-phong-${roomId}.xlsx`, workbook);
  }
}
