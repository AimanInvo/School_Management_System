import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entry';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  admissionNumber: string;

  @Column()
  rollNumber: string;

  @Column()
  className: string;

  @Column()
  section: string;

  @Column()
  gender: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column()
  guardianName: string;

  @Column()
  guardianPhone: string;

  @Column({ type: 'date' })
  admissionDate: string;

  @Column()
  address: string;

  @OneToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}