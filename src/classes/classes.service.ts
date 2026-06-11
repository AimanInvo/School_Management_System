import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Subject } from '../subjects/subjects.entry';
import { SchoolClass } from './classes.entry';

@Injectable()
export class ClassesService implements OnModuleInit {
  constructor(
    @InjectRepository(SchoolClass)
    private readonly classesRepository: Repository<SchoolClass>,

    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) {}

  async onModuleInit() {
    for (let gradeNumber = 1; gradeNumber <= 10; gradeNumber++) {
      const existingClass = await this.classesRepository.findOneBy({
        gradeNumber,
      });

      if (!existingClass) {
        const schoolClass = this.classesRepository.create({
          gradeNumber,
          name: `Class ${gradeNumber}`,
        });

        await this.classesRepository.save(schoolClass);
      }
    }
  }

  async findAll() {
    return this.classesRepository.find({
    relations: {
  subjects: true,
},
      order: {
        gradeNumber: 'ASC',
      },
    });
  }

  async assignSubjects(classId: number, subjectIds: number[]) {
    const schoolClass = await this.classesRepository.findOne({
      where: { id: classId },
    relations: {
  subjects: true,
},
    });

    if (!schoolClass) {
      throw new NotFoundException('Class not found');
    }

    const subjects = await this.subjectsRepository.findBy({
      id: In(subjectIds),
    });

    if (subjects.length !== subjectIds.length) {
      throw new BadRequestException('One or more subject IDs are invalid');
    }

    schoolClass.subjects = subjects;

    const updatedClass = await this.classesRepository.save(schoolClass);

    return {
      message: 'Subjects assigned to class successfully',
      class: updatedClass,
    };
  }
}