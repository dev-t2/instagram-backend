import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { IsEmail, IsString, Matches } from 'class-validator';

import { Common } from 'src/common/entities';

export class User extends Common implements UserModel {
  @ApiProperty({ required: true, description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, description: '닉네임' })
  @IsString()
  nickname: string;

  @ApiProperty({ required: true, description: '비밀번호' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_=+])[A-Za-z\d`~!@#$%^&*()_=+]{8,16}$/, {
    message: 'password must be a password',
  })
  password: string;
}
