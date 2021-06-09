import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../../prisma/client';

export default {
  Mutation: {
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
