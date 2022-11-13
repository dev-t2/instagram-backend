import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UsersRepository } from 'src/users/users.repository';
import { CreateUserDto, LoginDto } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  createAccessToken(id: number) {
    return { accessToken: this.jwtService.sign({ sub: 'access', id }, { expiresIn: '5m' }) };
  }

  createRefreshToken(id: number) {
    return { refreshToken: this.jwtService.sign({ sub: 'refresh', id }) };
  }

  async createUser({ email, nickname, password }: CreateUserDto) {
    const isExistsUser = await this.usersRepository.existsUser(email, nickname);

    if (isExistsUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.createUser(email, nickname, hashedPassword);

    return { ...this.createAccessToken(user.id), ...this.createRefreshToken(user.id) };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) {
      throw new UnauthorizedException();
    }

    return { ...this.createAccessToken(user.id), ...this.createRefreshToken(user.id) };
  }
}
