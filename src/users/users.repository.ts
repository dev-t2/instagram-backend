import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { email },
        select: { id: true, password: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserByNickname(nickname: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { nickname },
        select: { id: true, nickname: true },
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

  async createUser(email: string, nickname: string, password: string) {
    try {
      return await this.prismaService.user.create({
        data: { email, nickname, password, userInfo: { create: {} } },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserById(id: number) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id },
        select: { id: true, password: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async updateEmail(id: number, email: string) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: { email },
        select: { id: true, email: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async updateNickname(id: number, nickname: string) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: { nickname },
        select: { id: true, nickname: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async updatePassword(id: number, password: string) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: { password },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
