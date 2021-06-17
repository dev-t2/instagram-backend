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
          return { isSuccess: false, error: 'User does not exist' };
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
          return { isSuccess: false, error: 'The password is incorrect' };
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
