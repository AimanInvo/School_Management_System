import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entry';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  employeeId: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column()
  qualification: string;

  @Column()
  subjectSpecialization: string;

  @Column()
  department: string;

  @Column({ type: 'date' })
  joiningDate: string;

  @Column()
  address: string;

  @OneToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}