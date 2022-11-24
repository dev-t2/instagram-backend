import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateProfileDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser({ email, nickname, password }: CreateUserDto) {
    const isExistsUser = await this.usersRepository.existsUser(email, nickname);

    if (isExistsUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.createUser(email, nickname, hashedPassword);
  }

  async logout(id: number) {
    await this.usersRepository.updateIssuedAt(id, null);
  }

  async updateProfile(id: number, { email, nickname, password, bio }: UpdateProfileDto) {
    let hashedPassword: string | undefined;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await this.usersRepository.updateProfile(id, {
      email,
      nickname,
      password: hashedPassword,
      bio,
    });
  }

  async follow(id: number, userId: number) {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.follow(id, user.id);
  }

  async unfollow(id: number, userId: number) {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.unfollow(id, user.id);
  }

  async findUserByNickname(nickname: string) {
    if (!nickname.trim()) {
      throw new BadRequestException();
    }

    return await this.usersRepository.findUserByNickname(nickname);
  }
}
