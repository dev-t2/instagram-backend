import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';
import { parseHashTags } from '../photo.utils';

const resolvers: Resolvers = {
  Mutation: {
    updatePhoto: checkLogin(
      async (_, { id, caption }, { prismaClient, loggedInUser }) => {
        const photo = await prismaClient.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { hashTags: { select: { hashTag: true } } },
        });

        if (!photo) {
          return { isSuccess: false, error: 'No photos found' };
        }

        await prismaClient.photo.update({
          where: { id },
          data: {
            caption,
            hashTags: { disconnect: photo.hashTags, ...parseHashTags(caption) },
          },
        });

        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
