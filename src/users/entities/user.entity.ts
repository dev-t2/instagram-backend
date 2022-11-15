import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { IsDate, IsEmail, Matches } from 'class-validator';

import { Common } from 'src/common/entities';

export class User extends Common implements UserModel {
  @ApiProperty({ required: true, description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, description: '닉네임' })
  @Matches(/^[가-힣a-zA-Z0-9]{2,10}$/, {
    message: 'Nickname is not valid',
  })
  nickname: string;

  @ApiProperty({ required: true, description: '비밀번호' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_=+])[A-Za-z\d`~!@#$%^&*()_=+]{8,16}$/, {
    message: 'Password is not valid',
  })
  password: string;

  @ApiProperty({ description: '토큰 발행 날짜' })
  @IsDate()
  issuedAt: Date | null;
}
