import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { CompleteRegistrationDto, StudentResponseDto } from '../dto/registration.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async generateApplicationId(): Promise<string> {
    const year = new Date().getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);
    
    const count = await this.studentRepository
      .createQueryBuilder('student')
      .where('student.createdAt >= :startDate', { startDate: startOfYear })
      .andWhere('student.createdAt < :endDate', { endDate: endOfYear })
      .getCount();
      
    return `APP-${year}-${(count + 1).toString().padStart(5, '0')}`;
  }

  async register(registrationData: CompleteRegistrationDto): Promise<StudentResponseDto> {
    // Check if email already exists
    const existingStudent = await this.studentRepository.findOne({
      where: { email: registrationData.personalInfo.email },
    });

    if (existingStudent) {
      throw new ConflictException('Email already registered');
    }

    // Generate application ID
    const applicationId = await this.generateApplicationId();

    // Hash password
    const hashedPassword = await bcrypt.hash(registrationData.accountSecurity.password, 10);

    // Create student entity
    const student = new Student();
    student.applicationId = applicationId;
    student.email = registrationData.personalInfo.email;
    student.fullName = registrationData.personalInfo.fullName;
    student.phone = registrationData.personalInfo.phone;
    student.dateOfBirth = new Date(registrationData.personalInfo.dateOfBirth);
    student.gender = registrationData.personalInfo.gender;
    student.stateOfOrigin = registrationData.personalInfo.stateOfOrigin;
    student.currentResidence = registrationData.personalInfo.currentResidence;
    student.verificationMode = registrationData.personalInfo.verificationMode;
    student.verificationNumber = registrationData.personalInfo.verificationNumber;
    student.password = hashedPassword;
    student.education = registrationData.education.education;
    student.graduationYear = registrationData.education.graduationYear;
    student.institution = registrationData.education.institution;
    student.fieldOfStudy = registrationData.education.fieldOfStudy;
    student.otherQualifications = registrationData.education.otherQualifications?.map(q => ({
      name: q.name,
      documentUrls: [],
    })) || [];
    student.nyscStatus = registrationData.nysc.nyscStatus;
    student.nyscNumber = registrationData.nysc.nyscNumber || null;
    student.selectedProgram = registrationData.program.selectedProgram;
    student.employmentStatus = registrationData.financial.employmentStatus;
    student.hasComputer = registrationData.financial.hasComputer;
    student.studyRequirements = registrationData.financial.studyRequirements;
    student.hasSocialRegistration = registrationData.payment.hasSocialRegistration;
    student.socialRegistrationNumber = registrationData.payment.socialRegistrationNumber || null;
    student.status = registrationData.payment.hasSocialRegistration === 'yes' ? 'approved' : 'pending';
    student.paymentCompleted = registrationData.payment.hasSocialRegistration === 'yes';

    const savedStudent = await this.studentRepository.save(student);

    return {
      id: savedStudent.id,
      applicationId: savedStudent.applicationId,
      email: savedStudent.email,
      fullName: savedStudent.fullName,
      status: savedStudent.status,
      createdAt: savedStudent.createdAt,
      updatedAt: savedStudent.updatedAt,
    };
  }

  async findAll(): Promise<StudentResponseDto[]> {
    const students = await this.studentRepository.find({
      order: { createdAt: 'DESC' },
    });

    return students.map(student => ({
      id: student.id,
      applicationId: student.applicationId,
      email: student.email,
      fullName: student.fullName,
      status: student.status,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }));
  }

  async findById(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async findByApplicationId(applicationId: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { applicationId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async updateStatus(id: string, status: string): Promise<StudentResponseDto> {
    const student = await this.findById(id);
    student.status = status as any;
    const updatedStudent = await this.studentRepository.save(student);

    return {
      id: updatedStudent.id,
      applicationId: updatedStudent.applicationId,
      email: updatedStudent.email,
      fullName: updatedStudent.fullName,
      status: updatedStudent.status,
      createdAt: updatedStudent.createdAt,
      updatedAt: updatedStudent.updatedAt,
    };
  }

  async updatePaymentStatus(id: string, paymentCompleted: boolean, paymentReference?: string): Promise<StudentResponseDto> {
    const student = await this.findById(id);
    student.paymentCompleted = paymentCompleted;
    if (paymentReference) {
      student.paymentReference = paymentReference;
    }
    if (paymentCompleted) {
      student.status = 'approved';
    }
    
    const updatedStudent = await this.studentRepository.save(student);

    return {
      id: updatedStudent.id,
      applicationId: updatedStudent.applicationId,
      email: updatedStudent.email,
      fullName: updatedStudent.fullName,
      status: updatedStudent.status,
      createdAt: updatedStudent.createdAt,
      updatedAt: updatedStudent.updatedAt,
    };
  }

  async updateAssessmentScore(id: string, score: number): Promise<StudentResponseDto> {
    const student = await this.findById(id);
    student.assessmentScore = score;
    student.status = 'assessment_completed';
    
    const updatedStudent = await this.studentRepository.save(student);

    return {
      id: updatedStudent.id,
      applicationId: updatedStudent.applicationId,
      email: updatedStudent.email,
      fullName: updatedStudent.fullName,
      status: updatedStudent.status,
      createdAt: updatedStudent.createdAt,
      updatedAt: updatedStudent.updatedAt,
    };
  }

  async scheduleInterview(id: string, interviewDate: Date, notes?: string): Promise<StudentResponseDto> {
    const student = await this.findById(id);
    student.interviewDate = interviewDate;
    student.interviewNotes = notes || null;
    student.status = 'interview_scheduled';
    
    const updatedStudent = await this.studentRepository.save(student);

    return {
      id: updatedStudent.id,
      applicationId: updatedStudent.applicationId,
      email: updatedStudent.email,
      fullName: updatedStudent.fullName,
      status: updatedStudent.status,
      createdAt: updatedStudent.createdAt,
      updatedAt: updatedStudent.updatedAt,
    };
  }

  async enrollStudent(id: string): Promise<StudentResponseDto> {
    const student = await this.findById(id);
    student.status = 'enrolled';
    
    const updatedStudent = await this.studentRepository.save(student);

    return {
      id: updatedStudent.id,
      applicationId: updatedStudent.applicationId,
      email: updatedStudent.email,
      fullName: updatedStudent.fullName,
      status: updatedStudent.status,
      createdAt: updatedStudent.createdAt,
      updatedAt: updatedStudent.updatedAt,
    };
  }

  async getStatistics() {
    const totalStudents = await this.studentRepository.count();
    const pendingStudents = await this.studentRepository.count({ where: { status: 'pending' } });
    const approvedStudents = await this.studentRepository.count({ where: { status: 'approved' } });
    const enrolledStudents = await this.studentRepository.count({ where: { status: 'enrolled' } });

    return {
      total: totalStudents,
      pending: pendingStudents,
      approved: approvedStudents,
      enrolled: enrolledStudents,
    };
  }
} 