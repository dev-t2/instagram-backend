import bcrypt from 'bcrypt';
import client from '../../prisma/client';

export default {
  Mutation: {
    updateProfile: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      let hashedPassword;

      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: { id: 9 },
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
