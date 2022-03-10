import { Controller, Get } from '@nestjs/common';
import { TaskDto } from './dto/tasks.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks(): any {
    return this.taskService.getAllTasks();
  }
}
