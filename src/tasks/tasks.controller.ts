import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Json structure for task object',
  })
  async createTask(@Body() task: CreateTaskDto) {
    return await this.taskService.createTask(task);
  }

  @Get()
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return await this.taskService.getTaskById(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.deleteTask(id);
  }
}
