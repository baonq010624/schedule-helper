import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateTeacherDto {
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