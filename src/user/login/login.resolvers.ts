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
            error:
              '입력한 닉네임을 사용하는 계정을 찾을 수 없습니다. 닉네임을 확인하고 다시 시도하세요.',
          };
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
          return { isSuccess: false, error: 'Invalid Password' };
        }

        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        return { isSuccess: true, token };
      } catch (error) {
        return { isSuccess: false, error };
      }
    },
  },
};

export default resolvers;
