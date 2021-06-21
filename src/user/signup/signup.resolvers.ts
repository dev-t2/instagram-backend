import * as bcrypt from 'bcrypt';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    signup: async (
      _,
      { name, nickname, email, password },
      { prismaClient }
    ) => {
      try {
        let user;

        user = await prismaClient.user.findUnique({
          where: { nickname },
          select: { id: true },
        });

        if (user) {
          return {
            isSuccess: false,
            error: '이미 사용 중인 닉네임입니다.',
          };
        }

        user = await prismaClient.user.findUnique({
          where: { email },
          select: { id: true },
        });

        if (user) {
          return {
            isSuccess: false,
            error: '이미 사용 중인 이메일입니다.',
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prismaClient.user.create({
          data: {
            name,
            nickname,
            email,
            password: hashedPassword,
          },
        });

        return { isSuccess: true };
      } catch (error) {
        return {
          isSuccess: false,
          error: '서버 에러가 발생했습니다. 관리자에게 문의하세요.',
        };
      }
    },
  },
};

export default resolvers;
