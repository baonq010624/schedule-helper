import { IsString, IsNotEmpty } from 'class-validator';

export class PublishTimetableDto {
  @IsString()
  @IsNotEmpty()
  classId: string;

  @IsString()
  @IsNotEmpty()
  academicYearId: string;
}
