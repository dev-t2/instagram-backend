import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UsersRepository } from 'src/users/users.repository';

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

  async createUser(email: string, nickname: string, password: string) {
    const isExistsUser = await this.usersRepository.existsUser(email, nickname);

    if (isExistsUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.createUser({
      email,
      nickname,
      password: hashedPassword,
    });

    return {
      accessToken: this.createAccessToken(user.id).accessToken,
      refreshToken: this.createRefreshToken(user.id).refreshToken,
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.createAccessToken(user.id),
      refreshToken: this.createRefreshToken(user.id),
    };
  }
}
