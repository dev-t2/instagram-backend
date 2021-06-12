import * as bcrypt from 'bcrypt';
import { createWriteStream } from 'fs';
import { protectedResolver } from '../user.utils';

const resolver = async (
  _,
  { firstName, lastName, userName, email, password, aboutMe, avatar },
  { client, loggedInUser }
) => {
  let hashedPassword;
  let avatarUrl;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFileName = `${Date.now()}_${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      `${process.cwd()}/upload/${newFileName}`
    );

    readStream.pipe(writeStream);

    avatarUrl = `http://localhost:4000/static/${newFileName}`;
  }

  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      aboutMe,
      avatar: avatarUrl,
    },
  });

  if (!updatedUser) {
    return { isSuccess: false, error: 'Profile update failed' };
  }

  return { isSuccess: true };
};

export default {
  Mutation: { updateProfile: protectedResolver(resolver) },
};
