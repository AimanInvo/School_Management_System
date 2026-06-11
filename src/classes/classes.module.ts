import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './classes.entry';
import { Subject } from 'src/subjects/subjects.entry';

@Module({
   imports: [TypeOrmModule.forFeature([SchoolClass, Subject])],
  providers: [ClassesService],
  controllers: [ClassesController]
})
export class ClassesModule {}
