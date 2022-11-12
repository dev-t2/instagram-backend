import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, ExistsEmailDto, ExistsNicknameDto } from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '이메일 중복 확인' })
  @Post('email/exists')
  async existsEmail(@Body() { email }: ExistsEmailDto) {
    return await this.usersService.existsEmail(email);
  }

  @ApiOperation({ summary: '닉네임 중복 확인' })
  @Post('nickname/exists')
  async existsNickname(@Body() { nickname }: ExistsNicknameDto) {
    return await this.usersService.existsNickname(nickname);
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
