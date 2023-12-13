import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';

describe('CategoryService', () => {
  let service: CategoryService;
  let fakeCategoryRepository: Partial<CategoryRepository>;

  beforeEach(async () => {
    fakeCategoryRepository = {
      createCategory: () => {
        return Promise.resolve({
          id: 'jgvbksadf890',
          name: 'Artificial Intelligence',
        });
      },

      deleteCategory: () => {
        return Promise.resolve();
      },

      getAllCategories: () => {
        return Promise.resolve([
          {
            id: 'dsfas8d9fsdf',
            name: 'Category 1',
          },
        ]);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: fakeCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Should return all categories', async () => {
    const categories = await service.getAllCategories();
    expect(categories).toBeDefined();
  });
  it('Should remove a particular category', async () => {
    const category = await service.deleteCategory('yui8hjii');
    expect(category).toBeUndefined();
  });
  it('Should create a new category', async () => {
    const task = await service.createCategory({
      name: 'Artificial Intelligence',
    });
    expect(task).toBeDefined();
  });
});
