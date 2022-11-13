import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { UpdateProfileDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async updateProfile(id: number, { email, nickname, password }: UpdateProfileDto) {
    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    return await this.usersRepository.updateProfile(id, {
      email,
      nickname,
      password: hashedPassword,
    });
  }

  async findUserByNickname(nickname: string) {
    if (!nickname.trim()) {
      throw new BadRequestException();
    }

    return await this.usersRepository.findUserByNickname(nickname);
  }
}
