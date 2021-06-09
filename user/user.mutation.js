import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../prisma/client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const isUser = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });

        if (isUser) {
          throw new Error('userName or email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
          },
        });

        return user;
      } catch (error) {
        return error;
      }
    },
    login: async (_, { userName, password }) => {
      const user = await client.user.findUnique({ where: { userName } });

      if (!user) {
        return { isLogin: false, error: 'User Not Found' };
      }

      const isPassword = await bcrypt.compare(password, user.password);

      if (!isPassword) {
        return { isLogin: false, error: 'Invalid password' };
      }

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      return { isLogin: true, token };
    },
  },
};
