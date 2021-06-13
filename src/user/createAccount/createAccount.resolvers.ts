import * as bcrypt from 'bcrypt';
import { Resolvers } from '../../types';

const resolver: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password },
      { client }
    ) => {
      try {
        const isUser = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
          select: { id: true },
        });

        if (isUser) {
          throw new Error('userName or email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            firstName,
            lastName,
            userName,
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

export default resolver;
