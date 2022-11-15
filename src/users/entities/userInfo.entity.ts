import { ApiProperty } from '@nestjs/swagger';
import { UserInfo as UserInfoModel } from '@prisma/client';
import { IsPositive, IsString } from 'class-validator';

import { Common } from 'src/common/entities';

export class UserInfo extends Common implements UserInfoModel {
  @ApiProperty({ required: true, description: '유저 아이디' })
  @IsPositive()
  userId: number;

  @ApiProperty({ required: true, description: '아바타' })
  @IsString()
  avatar: string | null;

  @ApiProperty({ required: true, description: '자기 소개' })
  @IsString()
  bio: string | null;
}
