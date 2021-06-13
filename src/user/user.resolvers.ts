import { Resolvers } from '../types';

const resolvers: Resolvers = {
  User: {
    totalFollower: ({ id }, _, { client }) => {
      return client.user.count({ where: { follower: { some: { id } } } });
    },

    totalFollowing: ({ id }, _, { client }) => {
      return client.user.count({ where: { following: { some: { id } } } });
    },

    isMe: ({ id }, _, { loggedInUser }) => {
      return id === loggedInUser?.id;
    },

    isFollowing: async ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const numberOfFollowing = await client.user.count({
        where: { id: loggedInUser.id, following: { some: { id } } },
      });

      return Boolean(numberOfFollowing);
    },
  },
};

export default resolvers;
