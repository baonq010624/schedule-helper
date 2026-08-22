import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsString()
  @IsNotEmpty()
  type: string; // CLASSROOM, LAB, GYM
}