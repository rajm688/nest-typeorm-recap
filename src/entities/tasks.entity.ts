import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
export enum TaskStatus {
  active = 'active',
  close = 'close',
}
