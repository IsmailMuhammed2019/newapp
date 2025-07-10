import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity('assessments')
export class Assessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column('jsonb')
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    category: string;
  }>;

  @Column('jsonb', { nullable: true })
  answers: Array<{
    questionId: number;
    selectedAnswer: number;
    isCorrect: boolean;
  }>;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true })
  totalQuestions: number;

  @Column({ nullable: true })
  correctAnswers: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'in_progress' | 'completed' | 'graded';

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  timeSpent: number; // in minutes

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 