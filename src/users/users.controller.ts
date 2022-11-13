import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/common/decorators';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto, UpdateProfileDto } from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

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
  @Get('token')
  createAccessToken(@User('id') id: number) {
    return this.authService.createAccessToken(id);
  }

  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiBearerAuth('access')
  @UseGuards(AuthGuard('access'))
  @Post('profile')
  async updateProfile(@User('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return { id, updateProfileDto };
  }

  @ApiOperation({ summary: '유저 검색' })
  @ApiBearerAuth('access')
  @UseGuards(AuthGuard('access'))
  @Get('profile/:nickname')
  async findUserByNickname(@Param('nickname') nickname: string) {
    return await this.usersService.findUserByNickname(nickname);
  }
}
