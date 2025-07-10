import { Controller, Post, Get, Put, Param, Body, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { StudentService } from '../services/student.service';
import { CompleteRegistrationDto, StudentResponseDto } from '../dto/registration.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('register')
  @UseInterceptors(FilesInterceptor('files'))
  async register(
    @Body() registrationData: CompleteRegistrationDto,
    @UploadedFiles() files?: any[],
  ): Promise<StudentResponseDto> {
    return this.studentService.register(registrationData);
  }

  @Get()
  async findAll(@Query('status') status?: string): Promise<StudentResponseDto[]> {
    return this.studentService.findAll();
  }

  @Get('statistics')
  async getStatistics() {
    return this.studentService.getStatistics();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.studentService.findById(id);
  }

  @Get('application/:applicationId')
  async findByApplicationId(@Param('applicationId') applicationId: string) {
    return this.studentService.findByApplicationId(applicationId);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ): Promise<StudentResponseDto> {
    return this.studentService.updateStatus(id, body.status);
  }

  @Put(':id/payment')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() body: { paymentCompleted: boolean; paymentReference?: string },
  ): Promise<StudentResponseDto> {
    return this.studentService.updatePaymentStatus(id, body.paymentCompleted, body.paymentReference);
  }

  @Put(':id/assessment')
  async updateAssessmentScore(
    @Param('id') id: string,
    @Body() body: { score: number },
  ): Promise<StudentResponseDto> {
    return this.studentService.updateAssessmentScore(id, body.score);
  }

  @Put(':id/interview')
  async scheduleInterview(
    @Param('id') id: string,
    @Body() body: { interviewDate: string; notes?: string },
  ): Promise<StudentResponseDto> {
    return this.studentService.scheduleInterview(id, new Date(body.interviewDate), body.notes);
  }

  @Put(':id/enroll')
  async enrollStudent(@Param('id') id: string): Promise<StudentResponseDto> {
    return this.studentService.enrollStudent(id);
  }
} 