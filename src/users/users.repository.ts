import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './users.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

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
        data: {
          email,
          nickname,
          password,
          userInfo: { create: {} },
        },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

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

  async findUserById(id: number) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id },
        select: { id: true, issuedAt: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async updateIssuedAt(id: number, issuedAt: Date | null) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: { issuedAt },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async updateProfile(id: number, { email, nickname, password, bio }: UpdateProfileDto) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: {
          email,
          nickname,
          password,
          userInfo: { update: { bio } },
        },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async follow(id: number, userId: number) {
    try {
      return await this.prismaService.userInfo.update({
        where: { id },
        data: { following: { connect: { userId } } },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async unfollow(id: number, userId: number) {
    try {
      return await this.prismaService.userInfo.update({
        where: { id },
        data: { following: { disconnect: { userId } } },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserInfoById(userId: number) {
    try {
      return await this.prismaService.userInfo.findUnique({
        where: { userId },
        select: {
          user: { select: { id: true, nickname: true } },
          avatar: true,
          bio: true,
          followers: {
            select: {
              user: { select: { id: true, nickname: true } },
            },
          },
          following: {
            select: {
              user: { select: { id: true, nickname: true } },
            },
          },
        },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
