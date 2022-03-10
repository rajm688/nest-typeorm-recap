import { TaskStatus } from 'src/entities/tasks.entity';

export class TaskDto {
  title: string;
  desc: string;
  status: TaskStatus;
}
