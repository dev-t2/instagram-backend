import { ApiProperty, PickType } from '@nestjs/swagger';
import { Matches } from 'class-validator';

import { User } from './entities';

export class ExistsEmailDto extends PickType(User, ['email'] as const) {}

export class ExistsNicknameDto extends PickType(User, ['nickname'] as const) {}

export class CreateUserDto extends PickType(User, ['email', 'nickname', 'password'] as const) {}

export class LoginDto extends PickType(User, ['email', 'password'] as const) {}

export class UpdateEmailDto extends PickType(User, ['email'] as const) {}

export class UpdateNicknameDto extends PickType(User, ['nickname'] as const) {}

export class UpdatePasswordDto extends PickType(User, ['password'] as const) {
  @ApiProperty({ required: true, description: '새로운 비밀번호' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_=+])[A-Za-z\d`~!@#$%^&*()_=+]{8,16}$/, {
    message: 'password must be a password',
  })
  newPassword: string;
}
