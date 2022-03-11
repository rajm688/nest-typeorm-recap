import { Body, Controller, Get } from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}
  @Get()
  addPets(@Body('color') color: string, @Body('name') name: string) {
    return this.petsService.addPets(name, color);
  }
}
