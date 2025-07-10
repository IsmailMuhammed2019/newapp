import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './services/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Seed the database with sample data
  const seedService = app.get(SeedService);
  await seedService.seedDatabase();
  
  // Listen on all interfaces for Docker healthcheck
  await app.listen(process.env.PORT ?? 3001, process.env.HOSTNAME ?? '0.0.0.0');
  console.log('🚀 SBTS Backend is running on port 3001');
}
bootstrap();
