import { Transform } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value?.trim())
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value?.trim())
  code?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value?.trim())
  description?: string;
}