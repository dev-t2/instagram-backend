import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { nickname, password }, { prismaClient }) => {
      try {
        const user = await prismaClient.user.findUnique({
          where: { nickname },
          select: { id: true, password: true },
        });

        if (!user) {
          return {
            isSuccess: false,
            error: '입력된 닉네임이 올바르지 않습니다.',
          };
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
          return {
            isSuccess: false,
            error: '입력된 비밀번호가 올바르지 않습니다.',
          };
        }

        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        return { isSuccess: true, token };
      } catch (error) {
        console.error(error);

        return {
          isSuccess: false,
          error: '서버 에러가 발생했습니다. 관리자에게 문의하세요.',
        };
      }
    },
  },
};

export default resolvers;
