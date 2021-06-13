import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    readFollowing: async (_, { nickName, lastId }, { client }) => {
      const user = await client.user.findUnique({
        where: { nickName },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      const following = await client.user
        .findUnique({ where: { nickName } })
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
