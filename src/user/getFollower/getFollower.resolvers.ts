import { Resolvers } from '../../types';

const pageSize = 5;

const resolvers: Resolvers = {
  Query: {
    getFollower: async (_, { nickname, page }, { client }) => {
      const user = await client.user.findUnique({
        where: { nickname },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      const follower = await client.user
        .findUnique({ where: { nickname } })
        .follower({ skip: (page - 1) * pageSize, take: pageSize });

      const totalFollower = await client.user.count({
        where: { following: { some: { nickname } } },
      });

      const totalPage = Math.ceil(totalFollower / pageSize);

      return { isSuccess: true, follower, totalPage };
    },
  },
};

export default resolvers;
