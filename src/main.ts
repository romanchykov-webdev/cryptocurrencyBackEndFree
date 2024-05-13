import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//для валидации data
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  //pipe
  app.useGlobalPipes(new ValidationPipe());
  //pipe end

  //создание описания API
  const config = new DocumentBuilder()
    .setTitle('API testing documentation')
    .setDescription('this API for testing documentation')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  //создание описания API end


  await app.listen(port);
}

bootstrap();
