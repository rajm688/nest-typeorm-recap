import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pets } from './pets.entity';
import { Tasks } from './tasks.entity';
//   if you are using data mapper approach we need not to  extends base eintity
//   active Record is a  method where we write our query methods in the model itself where we need to extend the BaseEntity - ❌
//   Data Mapper in this method we will write our database queries in a seperte file called repository results in  cleaner code - ✅
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    name: 'username',
    unique: true,
    nullable: false,
  })
  username: string;
  @Column({
    name: 'password',
    nullable: false,
  })
  password: string;

  @OneToMany(() => Tasks, (tasks) => tasks.users)
  tasks: Tasks[];

  @ManyToMany((type) => Pets, (pets) => pets.users)
  pets: Pets[];
}
