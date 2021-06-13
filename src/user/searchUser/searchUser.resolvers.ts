import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword }, { client }) => {
      const users = await client.user.findMany({
        where: { nickname: { contains: keyword } },
        include: { followers: true, followings: true },
      });

      return users;
    },
  },
};

export default resolvers;
