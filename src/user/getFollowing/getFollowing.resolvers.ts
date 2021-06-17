import { Resolvers } from '../../types';

const pageSize = 5;

const resolvers: Resolvers = {
  Query: {
    getFollowing: async (_, { nickname, page, lastId }, { prismaClient }) => {
      const user = await prismaClient.user.findUnique({
        where: { nickname },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      if (page) {
        const followings = await prismaClient.user
          .findUnique({ where: { nickname } })
          .followers({ skip: (page - 1) * pageSize, take: pageSize });

        const totalFollowing = await prismaClient.user.count({
          where: { followers: { some: { nickname } } },
        });

        const totalPage = Math.ceil(totalFollowing / pageSize);

        return { isSuccess: true, followings, totalPage };
      }

      const followings = await prismaClient.user
        .findUnique({ where: { nickname } })
        .followings({
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          take: 5,
        });

      return { isSuccess: true, followings };
    },
  },
};

export default resolvers;
