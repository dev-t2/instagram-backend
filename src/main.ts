import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';

import { AppModule } from './app.module';
import { HttpLoggerMiddleware } from './common/middlewares';
import { TransformInterceptor } from './common/interceptors';
import { HttpExceptionFilter } from './common/filters';
import { PrismaService } from './prisma/prisma.service';

const { NODE_ENV, ADMIN_NAME, ADMIN_PASSWORD } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(HttpLoggerMiddleware);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: NODE_ENV === 'production',
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({ challenge: true, users: { [ADMIN_NAME]: ADMIN_PASSWORD } }),
  );

  const config = new DocumentBuilder()
    .setTitle('Instagram API')
    .setDescription('Instagram API Documentations')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'refresh')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
