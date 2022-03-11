import { Pets } from 'src/entities/pets.entity';
import { EntityRepository, Repository } from 'typeorm';
@EntityRepository(Pets)
export class PetsRepository extends Repository<Pets> {
  async addPets(name: string, color: string) {
    const newPet = this.createQueryBuilder()
      .insert()
      .into('Pets')
      .values({ name, color })
      .execute();
    return newPet;
  }
}
