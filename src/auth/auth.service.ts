import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) {
      throw new UnauthorizedException();
    }

    await this.usersRepository.updateIssuedAt(user.id);

    return { token: this.jwtService.sign({ sub: 'jwt', id: user.id }) };
  }
}
