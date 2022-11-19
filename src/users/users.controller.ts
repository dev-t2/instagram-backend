import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { User } from 'src/common/decorators';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt';
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

  @ApiOperation({ summary: '로그아웃' })
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@User('id') id: number) {
    return await this.usersService.logout(id);
  }

  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async updateProfile(@User('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return await this.usersService.updateProfile(id, updateProfileDto);
  }

  @ApiOperation({ summary: '아바타 업로드' })
  @ApiBearerAuth('token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { avatar: { type: 'string', format: 'binary' } },
    },
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('avatar')
  async uploadAvatar(@User('id') id: number, @UploadedFile() avatar: Express.Multer.File) {
    console.log({ id, avatar });

    return;
  }

  @ApiOperation({ summary: '유저 검색' })
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Get('profile/:nickname')
  async findUserByNickname(@Param('nickname') nickname: string) {
    return await this.usersService.findUserByNickname(nickname);
  }
}
