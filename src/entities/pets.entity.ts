import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tasks } from './tasks.entity';
import { User } from './users.entity';

@Entity()
export class Pets {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  color: string;
  @ManyToMany(() => User, (users) => users.pets)
  @JoinTable({
    name: 'pets_users_mapping',
    joinColumn: {
      name: 'pets_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
  @OneToOne(() => Tasks, (task) => task.pet)
  @JoinColumn()
  task: Tasks;
}
