import { SchoolClass } from 'src/classes/classes.entry';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { SchoolClass } from '../classes/school-class.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column({ nullable: true })
  description: string;

@ManyToMany(() => SchoolClass, (schoolClass) => schoolClass.subjects)
  classes: SchoolClass[];
}