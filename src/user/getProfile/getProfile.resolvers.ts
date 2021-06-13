import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getProfile: async (_, { nickName }, { client }) => {
      const user = await client.user.findUnique({
        where: { nickName },
      });

      return user;
    },
  },
};

export default resolvers;
