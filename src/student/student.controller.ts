import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/enums/user-role.enum';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';

@ApiTags('student')
@ApiBearerAuth()
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('createStudent')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }
}