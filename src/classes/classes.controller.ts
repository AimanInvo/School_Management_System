import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/enums/user-role.enum';
import { ClassesService } from './classes.service';
import { AssignSubjectsDto } from './dto/assign-subject.dto';

@ApiTags('classes')
@ApiBearerAuth()
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get('getAllClasses')
  @UseGuards(AuthGuard)
  findAll() {
    return this.classesService.findAll();
  }

  @Put(':classId/subjects')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  assignSubjects(
    @Param('classId') classId: string,
    @Body() assignSubjectsDto: AssignSubjectsDto,
  ) {
    return this.classesService.assignSubjects(
      +classId,
      assignSubjectsDto.subjectIds,
    );
  }
}