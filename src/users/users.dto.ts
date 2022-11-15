import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { User } from './entities';

export class CreateUserDto extends PickType(User, ['email', 'nickname', 'password'] as const) {}

export class LoginDto extends PickType(User, ['email', 'password'] as const) {}

export class UpdateProfileDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: true, description: '자기 소개' })
  @IsString()
  bio?: string;
}
