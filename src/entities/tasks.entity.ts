import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pets } from './pets.entity';
import { User } from './users.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  desc: string;
  @Column()
  status: TaskStatus;
  @ManyToOne(() => User, (users) => users.tasks)
  users: User;
  @OneToOne(() => Pets, (pet) => pet.task)
  pet: Pets;
}
export enum TaskStatus {
  active = 'active',
  close = 'close',
}
