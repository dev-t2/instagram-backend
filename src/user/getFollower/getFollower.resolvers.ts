import { Resolvers } from '../../types';

const pageSize = 5;

const resolvers: Resolvers = {
  Query: {
    getFollower: async (_, { nickname, page, lastId }, { client }) => {
      const user = await client.user.findUnique({
        where: { nickname },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      if (page) {
        const follower = await client.user
          .findUnique({ where: { nickname } })
          .follower({ skip: (page - 1) * pageSize, take: pageSize });

        const totalFollower = await client.user.count({
          where: { following: { some: { nickname } } },
        });

        const totalPage = Math.ceil(totalFollower / pageSize);

        return { isSuccess: true, follower, totalPage };
      }

      const follower = await client.user
        .findUnique({ where: { nickname } })
        .follower({
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          take: pageSize,
        });

      return { isSuccess: true, follower };
    },
  },
};

export default resolvers;
