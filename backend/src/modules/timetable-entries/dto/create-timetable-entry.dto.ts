import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateTimetableEntryDto {
  @IsString()
  @IsNotEmpty()
  academicYearId: string;

  @IsString()
  @IsNotEmpty()
  classId: string;

  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @IsString()
  @IsOptional()
  teacherId?: string;

  @IsEnum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'])
  @IsNotEmpty()
  dayOfWeek: string;

  @IsString()
  @IsNotEmpty()
  timeSlotId: string;

  @IsString()
  @IsOptional()
  roomId?: string;

  @IsString()
  @IsOptional()
  note?: string;
}
