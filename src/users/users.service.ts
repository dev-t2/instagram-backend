import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async existsEmail(email: string) {
    const isExistsEmail = await this.usersRepository.findUserByEmail(email);

    if (isExistsEmail) {
      throw new BadRequestException();
    }
  }

  async existsNickname(nickname: string) {
    const isExistsNickname = await this.usersRepository.findUserByNickname(nickname);

    if (isExistsNickname) {
      throw new BadRequestException();
    }
  }

  async updateEmail(id: number, email: string) {
    const isExistsEmail = await this.usersRepository.findUserByEmail(email);

    if (isExistsEmail) {
      throw new BadRequestException();
    }

    await this.usersRepository.updateEmail(id, email);
  }

  async updateNickname(id: number, nickname: string) {
    const isExistsNickname = await this.usersRepository.findUserByNickname(nickname);

    if (isExistsNickname) {
      throw new BadRequestException();
    }

    await this.usersRepository.updateNickname(id, nickname);
  }

  async findUserByNickname(nickname: string) {
    if (nickname.trim()) {
      return await this.usersRepository.findUserByNickname(nickname);
    }
  }
}
