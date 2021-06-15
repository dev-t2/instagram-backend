import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getLike: async (_, { id }, { client }) => {
      const likes = await client.like.findMany({
        where: { photoId: id },
        select: { user: true },
      });

      return likes.map(like => like.user);
    },
  },
};

export default resolvers;
