import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import getLogLevels from './logger/getLogLevels';
import { SwaggerDocumentOptions } from './utils/SwaggerDocumentOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production')
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('POC-API')
    .setDescription('Simple API Blog for studies purpose')
    .setVersion('1.0')
    .addTag('poc')
    .build();
  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);

  // Requirement to use cookie in authentication
  app.use(cookieParser());

  // enable cors for all domains
  app.enableCors();

  // Requirement to use class-validator as pipe validator
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
