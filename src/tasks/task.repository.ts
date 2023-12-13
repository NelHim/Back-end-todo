import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from './task-status.enum';
import { db } from 'src/helpers/db';

@Injectable()
export class TaskRepository {
  async createTask(title: string, description: string, categoryId: string) {
    try {
      const id = uuidv4();
      const task = {
        id,
        title,
        description,
        status: TaskStatus.OPEN,
        categoryId,
      };

      await db.push(`/tasks[]`, task, true);
      return task;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  }

  async getAllTasks() {
    try {
      return await db.getData('/tasks');
    } catch (error) {
      console.error('Failed to get all tasks:', error);
      throw error;
    }
  }

  async getTaskById(id: string) {
    try {
      return await db.find('/tasks', (task) => task.id === id);
    } catch (error) {
      return null;
    }
  }

  async deleteTask(id: string) {
    const taskIndex = await db.getIndex('/tasks', id);
    if (taskIndex === -1)
      throw new NotFoundException("The provided index doesn't exist");
    try {
      await db.delete(`/tasks[${taskIndex}]`);
    } catch (error) {
      return null;
    }
  }
}
