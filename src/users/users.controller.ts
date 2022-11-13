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
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiOperation({ summary: '토큰 재발급' })
  @ApiBearerAuth('refresh')
  @UseGuards(AuthGuard('refresh'))
  @Post('token')
  createAccessToken(@User('id') id: number) {
    return this.authService.createAccessToken(id);
  }

  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiBearerAuth('access')
  @UseGuards(AuthGuard('access'))
  @Post('profile')
  async updateProfile(@User('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return await this.usersService.updateProfile(id, updateProfileDto);
  }

  @ApiOperation({ summary: '유저 검색' })
  @ApiBearerAuth('access')
  @UseGuards(AuthGuard('access'))
  @Get('profile/:nickname')
  async findUserByNickname(@Param('nickname') nickname: string) {
    return await this.usersService.findUserByNickname(nickname);
  }
}
