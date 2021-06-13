import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword }, { client }) => {
      const users = await client.user.findMany({
        where: { nickName: { contains: keyword } },
      });

      return users;
    },
  },
};

export default resolvers;
