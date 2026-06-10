import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserRole } from '../users/enums/user-role.enum';
import { UsersService } from '../users/users.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly usersService: UsersService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const existingUser = await this.usersService.findOneByEmail(
      createStudentDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const existingStudent = await this.studentRepository.findOneBy({
      admissionNumber: createStudentDto.admissionNumber,
    });

    if (existingStudent) {
      throw new BadRequestException('Admission number already exists');
    }

    const hashedPassword = await bcryptjs.hash(createStudentDto.password, 10);

    const user = await this.usersService.create({
      name: createStudentDto.name,
      email: createStudentDto.email,
      password: hashedPassword,
      role: UserRole.STUDENT,
    });

    const student = this.studentRepository.create({
      admissionNumber: createStudentDto.admissionNumber,
      rollNumber: createStudentDto.rollNumber,
      className: createStudentDto.className,
      section: createStudentDto.section,
      gender: createStudentDto.gender,
      dateOfBirth: createStudentDto.dateOfBirth,
      guardianName: createStudentDto.guardianName,
      guardianPhone: createStudentDto.guardianPhone,
      admissionDate: createStudentDto.admissionDate,
      address: createStudentDto.address,
      user,
    });

    const savedStudent = await this.studentRepository.save(student);

    return {
      message: 'Student created successfully',
      student: savedStudent,
    };
  }
}