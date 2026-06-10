import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  name: string;

  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  admissionNumber: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  rollNumber: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  className: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  section: string;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  guardianName: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  guardianPhone: string;

  @IsDateString()
  admissionDate: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  address: string;
}