import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let fakeCategoryService: Partial<CategoryService>;

  beforeEach(async () => {
    fakeCategoryService = {
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
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: fakeCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('Should return all categories', async () => {
    const categories = await controller.getAllCategories();
    expect(categories).toBeDefined();
  });
  it('Should remove a particular category', async () => {
    const category = await controller.deleteCategory('yui8hjii');
    expect(category).toBeUndefined();
  });
  it('Should create a new category', async () => {
    const task = await controller.createCategory({
      name: 'Artificial Intelligence',
    });
    expect(task).toBeDefined();
  });
});
