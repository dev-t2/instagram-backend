import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    login: async (_, { userName, password }, { client }) => {
      try {
        const user = await client.user.findUnique({ where: { userName } });

        if (!user) {
          return { isSuccess: false, error: 'User Not Found' };
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
          return { isSuccess: false, error: 'Invalid password' };
        }

        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        return { isSuccess: true, token };
      } catch (error) {
        return { isSuccess: false, error };
      }
    },
  },
};
