import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existsEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { email },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async existsNickname(nickname: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { nickname },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async existsUser(email: string, nickname: string) {
    try {
      return await this.prismaService.user.findFirst({
        where: { OR: [{ email }, { nickname }] },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: { ...createUserDto, userInfo: { create: {} } },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
