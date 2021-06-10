import bcrypt from 'bcrypt';
import { createWriteStream } from 'fs';
import client from '../../prisma/client';
import { protectedResolver } from '../user.utils';

console.log(process.cwd());

const resolver = async (
  _,
  { firstName, lastName, userName, email, password, aboutMe, avatar },
  { loggedInUser }
) => {
  let hashedPassword;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const { filename, createReadStream } = await avatar;
  const readStream = createReadStream();
  const writeStream = createWriteStream(`${process.cwd()}/upload/${filename}`);

  readStream.pipe(writeStream);

  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      aboutMe,
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
