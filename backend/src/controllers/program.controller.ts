import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProgramService } from '../services/program.service';
import { Program } from '../entities/program.entity';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  async findAll(): Promise<Program[]> {
    return this.programService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Program> {
    return this.programService.findById(parseInt(id));
  }

  @Post()
  async create(@Body() programData: Partial<Program>): Promise<Program> {
    return this.programService.create(programData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() programData: Partial<Program>,
  ): Promise<Program> {
    return this.programService.update(parseInt(id), programData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.programService.delete(parseInt(id));
  }

  @Post('seed')
  async seedPrograms(): Promise<{ message: string }> {
    await this.programService.seedPrograms();
    return { message: 'Programs seeded successfully' };
  }
} 