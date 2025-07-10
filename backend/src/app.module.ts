import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './entities/student.entity';
import { Program } from './entities/program.entity';
import { Assessment } from './entities/assessment.entity';
import { StudentController } from './controllers/student.controller';
import { ProgramController } from './controllers/program.controller';
import { StudentService } from './services/student.service';
import { ProgramService } from './services/program.service';
import { SeedService } from './services/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER', 'sbts_user'),
        password: configService.get('DATABASE_PASSWORD', 'sbts_password'),
        database: configService.get('DATABASE_NAME', 'sbts_db'),
        entities: [Student, Program, Assessment],
        synchronize: true, // Enable for initial setup - TODO: Use migrations in production
        logging: configService.get('NODE_ENV') !== 'production',
        ssl: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Student, Program, Assessment]),
  ],
  controllers: [AppController, StudentController, ProgramController],
  providers: [AppService, StudentService, ProgramService, SeedService],
})
export class AppModule {}
