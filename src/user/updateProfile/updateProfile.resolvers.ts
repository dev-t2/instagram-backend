import * as bcrypt from 'bcrypt';

import { Resolvers } from '../../types';
import { uploadToS3 } from '../../common/common.utils';
import { checkLogin } from '../user.utils';

const resolvers: Resolvers = {
  Mutation: {
    updateProfile: checkLogin(
      async (
        _,
        { name, nickname, email, password, aboutMe, avatar },
        { prismaClient, loggedInUser }
      ) => {
        let hashedPassword;
        let avatarUrl;

        if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
        }

        if (avatar) {
          avatarUrl = await uploadToS3('avatar', avatar);
        }

        const updatedUser = await prismaClient.user.update({
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
      }
    ),
  },
};

export default resolvers;
