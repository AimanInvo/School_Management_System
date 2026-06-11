import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from '../subjects/subjects.entry';

@Entity()
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  gradeNumber: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Subject, (subject) => subject.classes)
  @JoinTable({
    name: 'class_subjects',
    joinColumn: {
      name: 'classId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subjectId',
      referencedColumnName: 'id',
    },
  })
  subjects: Subject[];
}