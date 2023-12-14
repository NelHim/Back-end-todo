import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(body: CreateCategoryDto) {
    return this.categoryRepository.createCategory(body);
  }

  async getAllCategories() {
    return this.categoryRepository.getAllCategories();
  }

  async deleteCategory(id: string) {
    return this.categoryRepository.deleteCategory(id);
  }
}
