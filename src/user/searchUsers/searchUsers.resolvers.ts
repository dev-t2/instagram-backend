import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword }, { prismaClient }) => {
      const users = await prismaClient.user.findMany({
        where: { nickname: { contains: keyword } },
        include: { followers: true, followings: true },
      });

      return users;
    },
  },
};

export default resolvers;
