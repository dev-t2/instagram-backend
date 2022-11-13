import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AccessStrategy, RefreshStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule,
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, AccessStrategy, RefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
