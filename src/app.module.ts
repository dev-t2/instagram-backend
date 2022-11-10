import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        DATABASE_URL: Joi.string().required(),
      }),
      validationOptions: { abortEarly: true },
    }),
    PrismaModule,
    UsersModule,
  ],
})
export class AppModule {}
