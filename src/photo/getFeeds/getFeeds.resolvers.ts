import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolvers: Resolvers = {
  Query: {
    getFeeds: checkLogin((_, __, { prismaClient, loggedInUser }) => {
      return prismaClient.photo.findMany({
        where: {
          OR: [
            { user: { followers: { some: { id: loggedInUser.id } } } },
            { userId: loggedInUser.id },
          ],
        },
        orderBy: { updatedAt: 'desc' },
      });
    }),
  },
};

export default resolvers;
