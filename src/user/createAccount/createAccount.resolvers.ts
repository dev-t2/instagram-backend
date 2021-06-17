import * as bcrypt from 'bcrypt';

import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { name, nickname, email, password },
      { prismaClient }
    ) => {
      const user = await prismaClient.user.findFirst({
        where: { OR: [{ nickname }, { email }] },
        select: { id: true },
      });

      if (user) {
        return {
          isSuccess: false,
          error: 'Nickname or Email already exists',
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
    },
  },
};

export default resolvers;
