import { IsString, IsEmail, IsDateString, IsEnum, IsArray, IsOptional, IsNumber, IsBoolean, MinLength, IsNotEmpty } from 'class-validator';

export class PersonalInfoDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  stateOfOrigin: string;

  @IsString()
  @IsNotEmpty()
  currentResidence: string;

  @IsEnum(['nin', 'passport', 'drivers-license', 'voters-card'])
  verificationMode: string;

  @IsString()
  @IsNotEmpty()
  verificationNumber: string;
}

export class AccountSecurityDto {
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  confirmPassword: string;
}

export class EducationDto {
  @IsEnum(['secondary', 'diploma', 'bachelor', 'master', 'phd', 'other'])
  education: string;

  @IsString()
  @IsNotEmpty()
  graduationYear: string;

  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsString()
  @IsNotEmpty()
  fieldOfStudy: string;

  @IsArray()
  @IsOptional()
  otherQualifications?: Array<{
    name: string;
    documents: File[];
  }>;
}

export class NYSCDto {
  @IsEnum(['completed', 'serving', 'exempted', 'not-started'])
  nyscStatus: string;

  @IsString()
  @IsOptional()
  nyscNumber?: string;
}

export class ProgramDto {
  @IsNumber()
  selectedProgram: number;
}

export class FinancialDto {
  @IsEnum(['employed', 'unemployed', 'student', 'self-employed', 'retired', 'other'])
  employmentStatus: string;

  @IsEnum(['yes', 'no'])
  hasComputer: string;

  @IsArray()
  studyRequirements: string[];
}

export class PaymentDto {
  @IsEnum(['yes', 'no'])
  hasSocialRegistration: string;

  @IsString()
  @IsOptional()
  socialRegistrationNumber?: string;
}

export class CompleteRegistrationDto {
  @IsNotEmpty()
  personalInfo: PersonalInfoDto;

  @IsNotEmpty()
  accountSecurity: AccountSecurityDto;

  @IsNotEmpty()
  education: EducationDto;

  @IsNotEmpty()
  nysc: NYSCDto;

  @IsNotEmpty()
  program: ProgramDto;

  @IsNotEmpty()
  financial: FinancialDto;

  @IsNotEmpty()
  payment: PaymentDto;
}

export class StudentResponseDto {
  id: string;
  applicationId: string;
  email: string;
  fullName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
} 