import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt';
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
    return await this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }

  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async updateProfile(@User('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return await this.usersService.updateProfile(id, updateProfileDto);
  }

  @ApiOperation({ summary: '유저 검색' })
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Get('profile/:nickname')
  async findUserByNickname(@Param('nickname') nickname: string) {
    return await this.usersService.findUserByNickname(nickname);
  }
}
