import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: checkLogin(
      async (_, { id }, { prismaClient, loggedInUser }) => {
        const photo = await prismaClient.photo.findUnique({
          where: { id },
          select: { userId: true },
        });

        if (!photo) {
          return { isSuccess: false, error: 'Photo Not Found' };
        }

        if (photo.userId !== loggedInUser.id) {
          return { isSuccess: false, error: 'Photo Not Permission' };
        }

        await prismaClient.photo.delete({ where: { id } });

        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
