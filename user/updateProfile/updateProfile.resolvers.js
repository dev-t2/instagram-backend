import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import client from '../../prisma/client';

export default {
  Mutation: {
    updateProfile: async (
      _,
      { token, firstName, lastName, userName, email, password }
    ) => {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);

      let hashedPassword;

      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          userName,
          email,
          password: hashedPassword,
        },
      });

      if (!updatedUser) {
        return { isSuccess: false, error: 'Profile update failed' };
      }

      return { isSuccess: true };
    },
  },
};
