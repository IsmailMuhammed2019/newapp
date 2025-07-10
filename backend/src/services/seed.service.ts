import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../entities/program.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
  ) {}

  async seedDatabase() {
    try {
      // Check if data already exists
      const existingPrograms = await this.programRepository.count();

      if (existingPrograms === 0) {
        await this.seedPrograms();
        console.log('✅ Sample programs seeded successfully');
      }

      console.log('🎉 Database seeding completed');
    } catch (error) {
      console.error('❌ Error seeding database:', error);
    }
  }

  private async seedPrograms() {
    const programs = [
      {
        name: 'Data Protection & Privacy Fundamentals',
        description: 'Comprehensive introduction to global data protection principles',
        category: 'Data Protection',
        duration_months: 3,
        price: 150000,
        isActive: true,
      },
      {
        name: 'Cybersecurity Fundamentals',
        description: 'Foundation course covering basic cybersecurity concepts',
        category: 'Cybersecurity',
        duration_months: 4,
        price: 200000,
        isActive: true,
      },
      {
        name: 'Advanced Cybersecurity',
        description: 'Advanced threat detection and analysis techniques',
        category: 'Cybersecurity',
        duration_months: 6,
        price: 300000,
        isActive: true,
      },
      {
        name: 'Regulatory Technology',
        description: 'Overview of Regulatory Technology landscape',
        category: 'RegTech',
        duration_months: 3,
        price: 180000,
        isActive: true,
      },
      {
        name: 'Business Process Optimization',
        description: 'Process mapping, analysis, and improvement methodologies',
        category: 'Business',
        duration_months: 4,
        price: 220000,
        isActive: true,
      },
      {
        name: 'Project Management Fundamentals',
        description: 'Project management methodology and lifecycle',
        category: 'Management',
        duration_months: 5,
        price: 250000,
        isActive: true,
      },
      {
        name: 'Cloud Infrastructure Management',
        description: 'Cloud computing platforms and management',
        category: 'Cloud',
        duration_months: 4,
        price: 280000,
        isActive: true,
      },
      {
        name: 'Artificial Intelligence Fundamentals',
        description: 'AI/ML concepts, algorithms, and applications',
        category: 'AI/ML',
        duration_months: 6,
        price: 350000,
        isActive: true,
      },
    ];

    for (const programData of programs) {
      const existingProgram = await this.programRepository.findOne({
        where: { name: programData.name },
      });

      if (!existingProgram) {
        const program = this.programRepository.create(programData);
        await this.programRepository.save(program);
      }
    }
  }


} 