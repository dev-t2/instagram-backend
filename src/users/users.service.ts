import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser({ email, nickname, password }: CreateUserDto) {
    const isUser = await this.usersRepository.existsUser(email, nickname);

    if (isUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.createUser({ email, nickname, password: hashedPassword });
  }
}
