import { Resolvers } from '../../types';

const pageSize = 5;

const resolvers: Resolvers = {
  Query: {
    getFollower: async (_, { nickname, page, lastId }, { prismaClient }) => {
      const user = await prismaClient.user.findUnique({
        where: { nickname },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      if (page) {
        const followers = await prismaClient.user
          .findUnique({ where: { nickname } })
          .followers({ skip: (page - 1) * pageSize, take: pageSize });

        const totalFollower = await prismaClient.user.count({
          where: { followings: { some: { nickname } } },
        });

        const totalPage = Math.ceil(totalFollower / pageSize);

        return { isSuccess: true, followers, totalPage };
      }

      const followers = await prismaClient.user
        .findUnique({ where: { nickname } })
        .followers({
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          take: pageSize,
        });

      return { isSuccess: true, followers };
    },
  },
};

export default resolvers;
