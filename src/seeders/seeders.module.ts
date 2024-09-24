import { Module } from '@nestjs/common';
import { SeedersController } from './controllers/seeders.controller';
import { SeedersService } from './services/seeders.service';

@Module({
  controllers: [SeedersController],
  providers: [SeedersService],
})
export class SeedersModule {}
