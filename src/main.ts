import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //a middleware to enable validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      //filters out any parameter being sent other than what we specified in dto's
      whitelist: true,
    }),
  );
  await app.listen(4000);
}
bootstrap();
