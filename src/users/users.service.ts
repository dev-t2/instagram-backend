import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUserByNickname(nickname: string) {
    if (nickname.trim()) {
      return await this.usersRepository.findUserByNickname(nickname);
    }
  }
}
