import bcrypt from 'bcrypt';
import client from '../../prisma/client';
import { protectedResolver } from '../user.utils';

const resolver = async (
  _,
  { firstName, lastName, userName, email, password, gender, avatar },
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
      gender,
    },
  });

  if (!updatedUser) {
    return { isSuccess: false, error: 'Profile update failed' };
  }

  return { isSuccess: true };
};

export default {
  Mutation: {
    updateProfile: protectedResolver(resolver),
  },
};
