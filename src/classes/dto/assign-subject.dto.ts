import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class AssignSubjectsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  subjectIds: number[];
}