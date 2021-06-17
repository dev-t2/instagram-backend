import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: checkLogin(
      async (_, { id }, { prismaClient, loggedInUser }) => {
        const photo = await prismaClient.photo.findUnique({ where: { id } });

        if (!photo) {
          return { isSuccess: false, error: 'No photos found' };
        }

        const where = {
          photoId_userId: { photoId: id, userId: loggedInUser.id },
        };
        const like = await prismaClient.like.findUnique({ where });

        if (like) {
          await prismaClient.like.delete({ where });
        } else {
          await prismaClient.like.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              photo: { connect: { id: photo.id } },
            },
          });
        }

        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
