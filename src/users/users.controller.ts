import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/common/decorators';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  ExistsEmailDto,
  ExistsNicknameDto,
  FindUserByNicknameDto,
  LoginDto,
} from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

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
  async createUser(@Body() { email, nickname, password }: CreateUserDto) {
    return await this.authService.createUser(email, nickname, password);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }

  @ApiOperation({ summary: '토큰 재발급' })
  @ApiBearerAuth('refresh')
  @UseGuards(AuthGuard('refresh'))
  @Post('token')
  createAccessToken(@User('id') userId: number) {
    return this.authService.createAccessToken(userId);
  }

  @ApiOperation({ summary: '닉네임으로 유저 검색' })
  @ApiBearerAuth('access')
  @UseGuards(AuthGuard('access'))
  @Post('profile/nickname')
  async findUserByNickname(@Body() { nickname }: FindUserByNicknameDto) {
    return await this.usersService.findUserByNickname(nickname);
  }
}
