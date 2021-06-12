import client from '../prisma/client';

export default {
  User: {
    totalFollower: ({ id }) => {
      return client.user.count({ where: { follower: { some: { id } } } });
    },

    totalFollowing: ({ id }) => {
      return client.user.count({ where: { following: { some: { id } } } });
    },

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      return id === loggedInUser.id;
    },

    isFollowing: async ({ id }, _, { loggedInUser }) => {
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
