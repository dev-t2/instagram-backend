import { PartialType, PickType } from '@nestjs/swagger';

import { User } from './entities';

export class CreateUserDto extends PickType(User, ['email', 'nickname', 'password'] as const) {}

export class LoginDto extends PickType(User, ['email', 'password'] as const) {}

export class UpdateProfileDto extends PartialType(CreateUserDto) {}
