import * as bcrypt from 'bcrypt';

import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { name, nickname, email, password },
      { client }
    ) => {
      try {
        const isUser = await client.user.findFirst({
          where: { OR: [{ nickname }, { email }] },
          select: { id: true },
        });

        if (isUser) {
          return {
            isSuccess: false,
            error: 'Nickname or Email already exists',
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            name,
            nickname,
            email,
            password: hashedPassword,
          },
        });

        return { isSuccess: true };
      } catch (error) {
        return { isSuccess: false, error };
      }
    },
  },
};

export default resolvers;
