import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  department: string;
}