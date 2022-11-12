import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async existsEmail(email: string) {
    const isExistsEmail = await this.usersRepository.existsEmail(email);

    if (isExistsEmail) {
      throw new BadRequestException();
    }
  }

  async existsNickname(Nickname: string) {
    const isExistsNickname = await this.usersRepository.existsNickname(Nickname);

    if (isExistsNickname) {
      throw new BadRequestException();
    }
  }

  async createUser({ email, nickname, password }: CreateUserDto) {
    const isExistsUser = await this.usersRepository.existsUser(email, nickname);

    if (isExistsUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.createUser({ email, nickname, password: hashedPassword });
  }

  async findUserByNickname(nickname: string) {
    return await this.usersRepository.findUserByNickname(nickname);
  }
}
