import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  duration_months: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column('text', { array: true, nullable: true })
  prerequisites: string[];

  @Column('text', { array: true, nullable: true })
  learningOutcomes: string[];

  @Column('text', { array: true, nullable: true })
  modules: string[];

  @Column({ nullable: true })
  maxStudents: number;

  @Column({ default: 0 })
  enrolledStudents: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 