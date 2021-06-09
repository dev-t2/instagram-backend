import bcrypt from 'bcrypt';
import client from '../../prisma/client';

export default {
  Mutation: {
    updateProfile: async (
      _,
      { firstName, lastName, userName, email, password },
      { loggedInUser }
    ) => {
      let hashedPassword;

      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
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