import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { i18nValidationErrorFactory, I18nValidationExceptionFilter } from 'nestjs-i18n';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('FELICITA  API')
    .setDescription('FELICITA API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(configService.getOrThrow('API_URL'))
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  
  app.useGlobalPipes(
    new ValidationPipe({ exceptionFactory: i18nValidationErrorFactory }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: false }));

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
