import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  academicYearId: string;

  @IsNumber()
  @IsNotEmpty()
  grade: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  roomId?: string;
}
