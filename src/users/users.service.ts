import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async existsEmail(email: string) {
    const isExistsEmail = await this.usersRepository.existsEmail(email);

    if (isExistsEmail) {
      throw new BadRequestException();
    }
  }

  async existsNickname(nickname: string) {
    const isExistsNickname = await this.usersRepository.existsNickname(nickname);

    if (isExistsNickname) {
      throw new BadRequestException();
    }
  }

  async findUserByNickname(nickname: string) {
    if (nickname.trim()) {
      return await this.usersRepository.findUserByNickname(nickname);
    }
  }
}
