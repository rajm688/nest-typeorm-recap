import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from 'src/entities/tasks.entity';
import { TaskDto } from './DTO/task.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  getTasks(): Promise<TaskDto[]> {
    return this.taskRepository.getTasks();
  }
  getTaskById(id: string): Promise<{}> {
    return this.taskRepository.getTaskById(id);
  }
  createTask(res: TaskDto): Promise<{}> {
    return this.taskRepository.createTask(res);
  }
  deleteTask(id: string): Promise<{}> {
    return this.taskRepository.deleteTask(id);
  }
  updateTask(id: string, status: TaskStatus): Promise<{}> {
    return this.taskRepository.updateTask(id, status);
  }
}
