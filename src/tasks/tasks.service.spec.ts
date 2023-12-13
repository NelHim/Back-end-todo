import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';

describe('TasksService', () => {
  let service: TaskService;
  let fakeTaskRepository: Partial<TaskRepository>;

  beforeEach(async () => {
    fakeTaskRepository = {
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
            id: '3',
            title: 'Title 1',
            description: 'Description 1',
            status: TaskStatus.OPEN,
            categoryId: 'gfds',
          },
        ]);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: fakeTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Should return all tasks', async () => {
    const tasks = await service.getAllTasks();
    expect(tasks).toBeDefined();
  });
  it('Should return a single task', async () => {
    const task = await service.getTaskById('2');
    expect(task).toBeDefined();
  });
  it('Should remove a particular task', async () => {
    const task = await service.deleteTask('2');
    expect(task).toBeUndefined();
  });
  it('Should create a new task', async () => {
    const task = await service.createTask({
      title: 'Setting Up',
      description: 'Importing all necessary modules',
      categoryId: 'asdf',
    });
    expect(task).toBeDefined();
  });
});
