import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    readProfile: async (_, { userName }, { client }) => {
      const user = await client.user.findUnique({
        where: { userName },
        include: {
          follower: true,
          following: true,
        },
      });

      return user;
    },
  },
};

export default resolvers;
