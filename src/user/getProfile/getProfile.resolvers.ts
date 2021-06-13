import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getProfile: async (_, { nickname }, { client }) => {
      const user = await client.user.findUnique({
        where: { nickname },
        include: { follower: true, following: true },
      });

      return user;
    },
  },
};

export default resolvers;
