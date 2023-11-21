import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = {
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, HEAD, DELETE, UPDATE, PATCH, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(cors);
  await app.listen(3000);
}
bootstrap();
