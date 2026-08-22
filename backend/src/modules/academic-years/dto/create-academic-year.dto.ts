import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAcademicYearDto {
  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
