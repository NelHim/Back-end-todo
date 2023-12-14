import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { db } from 'src/helpers/db';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryRepository {
  async createCategory({ name }: CreateCategoryDto) {
    try {
      const id = uuidv4();
      const category = { id, name };

      await db.push(`/categories[]`, category, true);
      return category;
    } catch (error) {
      console.error('Failed to create category:', error);
      throw error;
    }
  }

  async getAllCategories() {
    try {
      return db.getData('/categories');
    } catch (error) {
      console.error('Failed to get all categories:', error);
      throw error;
    }
  }

  async deleteCategory(id: string) {
    const categoryIndex = await db.getIndex('/categories', id);
    if (categoryIndex === -1)
      throw new NotFoundException("The provided index doesn't exist");

    const taskCategory = await db.find(
      '/tasks',
      (task) => task.categoryId === id,
    );
    console.log(taskCategory);
    if (taskCategory)
      throw new ConflictException(
        'The category you are trying to delete has tasks assigned to it',
      );
    try {
      db.delete(`/categories[${categoryIndex}]`);
    } catch (error) {
      return null;
    }
  }
}
