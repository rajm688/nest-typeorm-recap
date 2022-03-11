import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetsRepository } from './pets.repository';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetsRepository)
    private petsRepositroy: PetsRepository,
  ) {}
  addPets(name: string, color: string) {
    return this.petsRepositroy.addPets(name, color);
  }
}
