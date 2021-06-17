import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getLikes: async (_, { id }, { prismaClient }) => {
      const likes = await prismaClient.like.findMany({
        where: { photoId: id },
        select: { user: true },
      });

      return likes.map(like => like.user);
    },
  },
};

export default resolvers;
