import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
export enum TaskStatus {
  active = 'active',
  close = 'close',
}
