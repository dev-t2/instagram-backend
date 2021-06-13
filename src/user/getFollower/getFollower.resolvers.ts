import { Resolvers } from '../../types';

const pageSize = 5;

const resolvers: Resolvers = {
  Query: {
    getFollower: async (_, { nickName, page }, { client }) => {
      const user = await client.user.findUnique({
        where: { nickName },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      const follower = await client.user
        .findUnique({ where: { nickName } })
        .follower({ skip: (page - 1) * pageSize, take: pageSize });

      const totalFollower = await client.user.count({
        where: { following: { some: { nickName } } },
      });

      const totalPage = Math.ceil(totalFollower / pageSize);

      return { isSuccess: true, follower, totalPage };
    },
  },
};

export default resolvers;
