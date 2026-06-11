import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './subjects.entry';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const existingName = await this.subjectsRepository.findOneBy({
      name: createSubjectDto.name,
    });

    if (existingName) {
      throw new BadRequestException('Subject name already exists');
    }

    if (createSubjectDto.code) {
      const existingCode = await this.subjectsRepository.findOneBy({
        code: createSubjectDto.code,
      });

      if (existingCode) {
        throw new BadRequestException('Subject code already exists');
      }
    }

    const subject = this.subjectsRepository.create(createSubjectDto);
    const savedSubject = await this.subjectsRepository.save(subject);

    return {
      message: 'Subject created successfully',
      subject: savedSubject,
    };
  }

  async findAll() {
    return this.subjectsRepository.find({
    relations: {
  classes: true,
},
    });
  }

  async findOne(id: number) {
    const subject = await this.subjectsRepository.findOne({
      where: { id },
     relations: {
  classes: true,
},
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.findOne(id);

    if (updateSubjectDto.name) {
      const existingName = await this.subjectsRepository.findOneBy({
        name: updateSubjectDto.name,
      });

      if (existingName && existingName.id !== id) {
        throw new BadRequestException('Subject name already exists');
      }
    }

    if (updateSubjectDto.code) {
      const existingCode = await this.subjectsRepository.findOneBy({
        code: updateSubjectDto.code,
      });

      if (existingCode && existingCode.id !== id) {
        throw new BadRequestException('Subject code already exists');
      }
    }

    Object.assign(subject, updateSubjectDto);

    const updatedSubject = await this.subjectsRepository.save(subject);

    return {
      message: 'Subject updated successfully',
      subject: updatedSubject,
    };
  }

  async delete(id: number) {
    const subject = await this.findOne(id);

    await this.subjectsRepository.remove(subject);

    return {
      message: 'Subject deleted successfully',
    };
  }
}