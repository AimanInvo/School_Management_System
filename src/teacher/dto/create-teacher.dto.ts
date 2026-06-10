import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class CreateTeacherDto {
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
  employeeId: string;

  @IsString()
  @MinLength(1)
  phone: string;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  @MinLength(1)
  qualification: string;

  @IsString()
  @MinLength(1)
  subjectSpecialization: string;

  @IsString()
  @MinLength(1)
  department: string;

  @IsString()
  joiningDate: string;

  @IsString()
  @MinLength(1)
  address: string;
}