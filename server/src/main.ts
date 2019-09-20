import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = await new ConfigService();

  await app
    .setGlobalPrefix(config.get('API_PREFFIX'))
    .useGlobalPipes(new ValidationPipe())
    .enableCors()
    .listen(config.get('PORT'));
}
bootstrap();
