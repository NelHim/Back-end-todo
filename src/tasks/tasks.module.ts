import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { TaskRepository } from './task.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TasksModule {}
