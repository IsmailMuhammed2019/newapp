import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../entities/program.entity';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
  ) {}

  async findAll(): Promise<Program[]> {
    return this.programRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findById(id: number): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { id, isActive: true },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return program;
  }

  async create(programData: Partial<Program>): Promise<Program> {
    const program = this.programRepository.create(programData);
    return this.programRepository.save(program);
  }

  async update(id: number, programData: Partial<Program>): Promise<Program> {
    const program = await this.findById(id);
    Object.assign(program, programData);
    return this.programRepository.save(program);
  }

  async delete(id: number): Promise<void> {
    const program = await this.findById(id);
    program.isActive = false;
    await this.programRepository.save(program);
  }

  async seedPrograms(): Promise<void> {
    const programs = [
      {
        name: 'Cybersecurity Fundamentals',
        description: 'Comprehensive introduction to cybersecurity principles and practices',
        category: 'Cybersecurity',
        duration_months: 4,
        price: 150000,
        prerequisites: ['Basic computer skills', 'High school education'],
        learningOutcomes: [
          'Understand cybersecurity fundamentals',
          'Implement basic security measures',
          'Identify common threats and vulnerabilities'
        ],
        modules: [
          'Introduction to Cybersecurity',
          'Network Security',
          'Cryptography Basics',
          'Security Policies and Procedures'
        ],
        maxStudents: 50,
      },
      {
        name: 'Data Protection & Privacy',
        description: 'Learn about data protection laws and privacy implementation',
        category: 'Data Protection',
        duration_months: 3,
        price: 120000,
        prerequisites: ['Basic understanding of business processes'],
        learningOutcomes: [
          'Understand data protection regulations',
          'Implement privacy by design',
          'Conduct privacy impact assessments'
        ],
        modules: [
          'Data Protection Fundamentals',
          'GDPR and NDPA Compliance',
          'Privacy Impact Assessment',
          'Data Breach Response'
        ],
        maxStudents: 40,
      },
      {
        name: 'AI & Machine Learning',
        description: 'Advanced course in artificial intelligence and machine learning',
        category: 'Emerging Tech',
        duration_months: 6,
        price: 200000,
        prerequisites: ['Programming basics', 'Mathematics background'],
        learningOutcomes: [
          'Build ML models',
          'Understand AI algorithms',
          'Implement AI solutions'
        ],
        modules: [
          'Machine Learning Fundamentals',
          'Deep Learning',
          'Natural Language Processing',
          'Computer Vision'
        ],
        maxStudents: 30,
      },
      {
        name: 'Network Security Essentials',
        description: 'Essential network security concepts and implementation',
        category: 'Cybersecurity',
        duration_months: 4,
        price: 140000,
        prerequisites: ['Basic networking knowledge'],
        learningOutcomes: [
          'Secure network infrastructure',
          'Implement firewalls and IDS',
          'Monitor network traffic'
        ],
        modules: [
          'Network Security Fundamentals',
          'Firewall Configuration',
          'Intrusion Detection',
          'Network Monitoring'
        ],
        maxStudents: 45,
      },
      {
        name: 'Digital Forensics',
        description: 'Learn digital forensics investigation techniques',
        category: 'Cybersecurity',
        duration_months: 5,
        price: 180000,
        prerequisites: ['Cybersecurity fundamentals'],
        learningOutcomes: [
          'Conduct digital investigations',
          'Preserve digital evidence',
          'Analyze forensic data'
        ],
        modules: [
          'Digital Forensics Methodology',
          'Evidence Collection',
          'Forensic Analysis',
          'Legal Considerations'
        ],
        maxStudents: 35,
      },
      {
        name: 'Cloud Security Architecture',
        description: 'Security architecture for cloud environments',
        category: 'Cloud Security',
        duration_months: 4,
        price: 160000,
        prerequisites: ['Basic cloud knowledge'],
        learningOutcomes: [
          'Design secure cloud architectures',
          'Implement cloud security controls',
          'Manage cloud security risks'
        ],
        modules: [
          'Cloud Security Fundamentals',
          'AWS Security',
          'Azure Security',
          'Cloud Compliance'
        ],
        maxStudents: 40,
      },
    ];

    for (const programData of programs) {
      const existingProgram = await this.programRepository.findOne({
        where: { name: programData.name },
      });

      if (!existingProgram) {
        await this.create(programData);
      }
    }
  }
} 