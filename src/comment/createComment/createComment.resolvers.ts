import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    createComment: checkLogin(
      async (_, { photoId, comment }, { prismaClient, loggedInUser }) => {
        const photo = await prismaClient.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });

        if (!photo) {
          return { isSuccess: false, error: 'No photos found' };
        }

        await prismaClient.comment.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            photo: { connect: { id: photoId } },
            comment,
          },
        });

        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
