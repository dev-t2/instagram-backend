import * as bcrypt from 'bcrypt';

import { Resolver, Resolvers } from '../../types';
import { uploadPhoto } from '../../common/common.utils';
import { checkLogin } from '../user.utils';

const resolver: Resolver = async (
  _,
  { name, nickname, email, password, aboutMe, avatar },
  { client, loggedInUser }
) => {
  let hashedPassword;
  let avatarUrl;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  if (avatar) {
    avatarUrl = await uploadPhoto(avatar);
  }

  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      name,
      nickname,
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

const resolvers: Resolvers = {
  Mutation: { updateProfile: checkLogin(resolver) },
};

export default resolvers;
