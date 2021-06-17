import { Resolvers } from '../../types';
import { uploadToS3 } from '../../common/common.utils';
import { checkLogin } from '../../user/user.utils';
import { parseHashTags } from '../photo.utils';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: checkLogin(
      async (_, { photo, caption }, { prismaClient, loggedInUser }) => {
        const hashTags = parseHashTags(caption);
        const photoUrl = await uploadToS3('photo', photo);

        return prismaClient.photo.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            url: photoUrl,
            caption,
            hashTags,
          },
        });
      }
    ),
  },
};

export default resolvers;
