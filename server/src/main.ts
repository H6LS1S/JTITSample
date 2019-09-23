import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = await new ConfigService();
  const options = await new DocumentBuilder()
    .setDescription(config.get('npm_package_description'))
    .setVersion(config.get('npm_package_version'))
    .setTitle(config.get('npm_package_name'))
    .setBasePath(config.get('PREFFIX'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app
    .setGlobalPrefix(config.get('PREFFIX'))
    .useGlobalPipes(new ValidationPipe())
    .enableCors()
    .listen(config.get('PORT'));
}
bootstrap();
