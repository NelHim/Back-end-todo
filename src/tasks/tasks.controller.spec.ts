import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { TaskStatus } from '../tasks/task-status.enum';

describe('TaskController', () => {
  let controller: TaskController;
  let fakeTaskService: Partial<TaskService>;

  beforeEach(async () => {
    fakeTaskService = {
      createTask: () => {
        return Promise.resolve({
          id: '3',
          title: 'Title 1',
          description: 'Description 1',
          status: TaskStatus.OPEN,
          categoryId: 'gfds',
        });
      },

      deleteTask: () => {
        return Promise.resolve();
      },

      getTaskById: (id: string) => {
        return Promise.resolve({
          id,
          description: 'Task one',
          status: TaskStatus.OPEN,
          categoryId: '2',
        });
      },

      getAllTasks: () => {
        return Promise.resolve([
          {
            id: '1',
            title: 'Title 2',
            description: 'Task one',
            status: TaskStatus.OPEN,
            categoryId: '2',
          },
        ]);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: fakeTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('it should return all tasks', async () => {
    const tasks = await controller.getAllTasks();
    expect(tasks).toBeInstanceOf(Array);
  });
  it('should return one task', async () => {
    const task = await controller.getTaskById('2');
    expect(task).toBeDefined();
  });
  it('Should remove a task', async () => {
    const task = await controller.deleteTask('2');
    expect(task).toBeUndefined();
  });
  it('Should create a task', async () => {
    const newTask = await controller.createTask({
      title: 'Setting Up',
      description: 'Importing all necessary modules',
      categoryId: 'asdf',
    });
    expect(newTask).toBeDefined();
  });
});
