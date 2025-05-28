import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

export default server;
