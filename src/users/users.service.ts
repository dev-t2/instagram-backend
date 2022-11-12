import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async existsEmail(email: string) {
    const isEmail = await this.usersRepository.existsEmail(email);

    if (isEmail) {
      throw new BadRequestException();
    }
  }

  async existsNickname(Nickname: string) {
    const isNickname = await this.usersRepository.existsNickname(Nickname);

    if (isNickname) {
      throw new BadRequestException();
    }
  }

  async existsUser({ email, nickname, password }: CreateUserDto) {
    const isUser = await this.usersRepository.existsUser(email, nickname);

    if (isUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.createUser({ email, nickname, password: hashedPassword });
  }

  async createUser({ email, nickname, password }: CreateUserDto) {
    const isUser = await this.usersRepository.existsUser(email, nickname);

    if (isUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.createUser({ email, nickname, password: hashedPassword });
  }
}
