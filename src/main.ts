import * as fs from 'fs';
if (!fs.existsSync('.env')) {
  throw new Error('.env file doesn\'t exist');
}

import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
