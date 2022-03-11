import { Tasks, TaskStatus } from 'src/entities/tasks.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TaskDto } from './DTO/task.dto';
@EntityRepository(Tasks)
export class TaskRepository extends Repository<Tasks> {
  async getTasks(): Promise<TaskDto[]> {
    try {
      const allTasks = await this.createQueryBuilder().getMany();
      return allTasks;
    } catch (error) {
      throw new Error('something went wrong while getting all tasks');
    }
  }
  async getTaskById(id: string): Promise<{}> {
    try {
      const task = await this.createQueryBuilder().where({ id }).getOne();
      if (task) {
        return task;
      } else return { mes: 'task not found' };
    } catch (error) {
      throw new Error('error in getting task by id');
    }
  }
  async createTask(res: TaskDto): Promise<{}> {
    try {
      const { title, desc, status } = res;
      await this.createQueryBuilder()
        .insert()
        .into(Tasks)
        .values({ title, desc, status: TaskStatus.active })
        .execute();
      return { mes: 'task created successfully' };
    } catch (error) {
      throw new Error('something went wrong while creating a new task');
    }
  }
  async deleteTask(id: string): Promise<{}> {
    try {
      const result = await this.createQueryBuilder()
        .delete()
        .from(Tasks)
        .where({ id })
        .execute();
      if (result.affected === 0) {
        return { mes: 'task does not exists' };
      } else return { mes: 'Task deleted successfully' };
    } catch (error) {
      throw new Error('something went wrong while deleting a task');
    }
  }
  async updateTask(id: string, status: TaskStatus): Promise<{}> {
    try {
      const updatedTask = this.createQueryBuilder()
        .update(Tasks)
        .set({ status })
        .where({ id })
        .execute();
      if ((await updatedTask).affected === 0) {
        return { mes: 'Task does not exists' };
      } else {
        return { mes: ' task updated successfully' };
      }
    } catch (error) {
      return { mes: 'error in updating task' };
    }
  }
}
