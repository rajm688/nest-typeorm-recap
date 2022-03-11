import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsRepository } from './pets.repository';
import { PetsService } from './pets.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetsRepository])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
