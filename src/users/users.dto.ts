import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

import { User } from './entities';

export class CreateUserDto extends PickType(User, ['email', 'nickname', 'password'] as const) {}

export class LoginDto extends PickType(User, ['email', 'password'] as const) {}

export class UpdateProfileDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, description: '자기 소개' })
  bio?: string;
}

export class FollowDto {
  @ApiProperty({ required: true, description: '커서 아이디' })
  @IsPositive()
  cursorId?: number;
}
