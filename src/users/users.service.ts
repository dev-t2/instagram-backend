import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser({ email, nickname }: CreateUserDto) {
    const isEmail = await this.usersRepository.existsEmail(email);

    if (isEmail) {
      throw new BadRequestException();
    }

    const isNickname = await this.usersRepository.existsNickname(nickname);

    if (isNickname) {
      throw new BadRequestException();
    }

    return;
  }
}
