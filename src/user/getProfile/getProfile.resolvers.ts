import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getProfile: async (_, { nickname }, { prismaClient }) => {
      const user = await prismaClient.user.findUnique({
        where: { nickname },
        include: { followers: true, followings: true },
      });

      return user;
    },
  },
};

export default resolvers;
