import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getFollowing: async (_, { nickname, lastId }, { client }) => {
      const user = await client.user.findUnique({
        where: { nickname },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      const following = await client.user
        .findUnique({ where: { nickname } })
        .following({
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          take: 5,
        });

      return { isSuccess: true, following };
    },
  },
};

export default resolvers;
