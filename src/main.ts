import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);
  const config = new DocumentBuilder()
    .setTitle('School API')
    .setDescription('Simple NestJS PostgreSQL school management system')
    .setVersion('1.0')
 .addTag('products')
  .addTag('auth')
  .addTag('users')
  .addTag('student')
  .addTag('teacher')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();