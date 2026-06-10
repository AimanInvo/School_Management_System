import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { StudentController } from './student.controller';
import { Student } from './student.entity';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), UsersModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}