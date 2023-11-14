import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = {
    origin: ['*'],
    methods: 'GET, POST, PUT, HEAD, DELETE, UPDATE, PATCH, OPTIONS',
  };
  app.enableCors(cors);
  await app.listen(3000);
}
bootstrap();
