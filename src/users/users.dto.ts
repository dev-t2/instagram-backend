import { PickType } from '@nestjs/swagger';

import { User } from './entities';

export class ExistsEmailDto extends PickType(User, ['email'] as const) {}

export class ExistsNicknameDto extends PickType(User, ['nickname'] as const) {}

export class CreateUserDto extends PickType(User, ['email', 'nickname', 'password'] as const) {}

export class LoginDto extends PickType(User, ['email', 'password'] as const) {}
