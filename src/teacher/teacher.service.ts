import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserRole } from '../users/enums/user-role.enum';
import { UsersService } from '../users/users.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './teacher.entry';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly usersService: UsersService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const existingUser = await this.usersService.findOneByEmail(
      createTeacherDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const existingTeacher = await this.teacherRepository.findOneBy({
      employeeId: createTeacherDto.employeeId,
    });

    if (existingTeacher) {
      throw new BadRequestException('Employee ID already exists');
    }

    const hashedPassword = await bcryptjs.hash(createTeacherDto.password, 10);

    const user = await this.usersService.create({
      name: createTeacherDto.name,
      email: createTeacherDto.email,
      password: hashedPassword,
      role: UserRole.TEACHER,
    });

    const teacher = this.teacherRepository.create({
      employeeId: createTeacherDto.employeeId,
      phone: createTeacherDto.phone,
      gender: createTeacherDto.gender,
      dateOfBirth: createTeacherDto.dateOfBirth,
      qualification: createTeacherDto.qualification,
      subjectSpecialization: createTeacherDto.subjectSpecialization,
      department: createTeacherDto.department,
      joiningDate: createTeacherDto.joiningDate,
      address: createTeacherDto.address,
      user,
    });

    const savedTeacher = await this.teacherRepository.save(teacher);

    return {
      message: 'Teacher created successfully',
      teacher: savedTeacher,
    };
  }
}