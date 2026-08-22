import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTimeSlotDto {
  @IsString()
  @IsNotEmpty()
  session: string; // MORNING, AFTERNOON

  @IsNumber()
  period: number;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  type: string; // CLASS, BREAK

  @IsNumber()
  @IsNotEmpty()
  order: number;
}