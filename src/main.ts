import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initilizeDB } from './helpers/db';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  await initilizeDB();
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('todo-app API')
    .setDescription(
      'todo-app API helps gives you the CRUD functionaliy for tasks and their respective categories',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
