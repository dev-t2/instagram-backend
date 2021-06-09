import bcrypt from 'bcrypt';
import client from '../client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const isUser = await client.user.findUnique({
          where: { OR: [{ userName }, { email }] },
        });

        if (isUser) {
          throw new Error('userName or email already exists.');
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
  },
};
