import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  applicationId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  stateOfOrigin: string;

  @Column()
  currentResidence: string;

  @Column()
  verificationMode: string;

  @Column()
  verificationNumber: string;

  @Column('text', { array: true, nullable: true })
  verificationDocumentUrls: string[];

  @Exclude()
  @Column()
  password: string;

  @Column()
  education: string;

  @Column()
  graduationYear: string;

  @Column()
  institution: string;

  @Column()
  fieldOfStudy: string;

  @Column('text', { array: true, nullable: true })
  educationalDocumentUrls: string[];

  @Column('jsonb', { nullable: true })
  otherQualifications: Array<{
    name: string;
    documentUrls: string[];
  }>;

  @Column()
  nyscStatus: string;

  @Column({ type: 'varchar', nullable: true })
  nyscNumber: string | null;

  @Column('text', { array: true, nullable: true })
  nyscDocumentUrls: string[];

  @Column({ type: 'int', nullable: true })
  selectedProgram: number | null;

  @Column()
  employmentStatus: string;

  @Column()
  hasComputer: string;

  @Column('text', { array: true })
  studyRequirements: string[];

  @Column()
  hasSocialRegistration: string;

  @Column({ type: 'varchar', nullable: true })
  socialRegistrationNumber: string | null;

  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected' | 'assessment_completed' | 'interview_scheduled' | 'enrolled';

  @Column({ default: false })
  paymentCompleted: boolean;

  @Column({ type: 'varchar', nullable: true })
  paymentReference: string | null;

  @Column({ type: 'int', nullable: true })
  assessmentScore: number | null;

  @Column({ nullable: true })
  interviewDate: Date;

  @Column({ type: 'varchar', nullable: true })
  interviewNotes: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 