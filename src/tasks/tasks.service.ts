import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask({ title, description, categoryId }: CreateTaskDto) {
    return await this.taskRepository.createTask(title, description, categoryId);
  }

  async getAllTasks() {
    return await this.taskRepository.getAllTasks();
  }

  async getTaskById(id: string) {
    return await this.taskRepository.getTaskById(id);
  }

  async deleteTask(id: string) {
    return await this.taskRepository.deleteTask(id);
  }
}
