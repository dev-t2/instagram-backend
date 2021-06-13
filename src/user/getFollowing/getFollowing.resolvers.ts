import { Resolvers } from '../../types';

const pageSize = 5;

const resolvers: Resolvers = {
  Query: {
    getFollowing: async (_, { nickname, page, lastId }, { client }) => {
      const user = await client.user.findUnique({
        where: { nickname },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      if (page) {
        const following = await client.user
          .findUnique({ where: { nickname } })
          .follower({ skip: (page - 1) * pageSize, take: pageSize });

        const totalFollowing = await client.user.count({
          where: { follower: { some: { nickname } } },
        });

        const totalPage = Math.ceil(totalFollowing / pageSize);

        return { isSuccess: true, following, totalPage };
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
