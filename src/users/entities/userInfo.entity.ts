import { ApiProperty } from '@nestjs/swagger';
import { UserInfo as UserInfoModel } from '@prisma/client';
import { IsPositive } from 'class-validator';

import { Common } from 'src/common/entities';

export class UserInfo extends Common implements UserInfoModel {
  @ApiProperty({ required: true, description: '아이디' })
  @IsPositive()
  userId: number;
}
