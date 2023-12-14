import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TasksModule, CategoryModule],
})
export class AppModule {}
