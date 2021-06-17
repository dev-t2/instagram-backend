import { Resolvers } from '../types';

const resolvers: Resolvers = {
  User: {
    totalFollower: ({ id }, _, { prismaClient }) => {
      return prismaClient.user.count({
        where: { followers: { some: { id } } },
      });
    },

    totalFollowing: ({ id }, _, { prismaClient }) => {
      return prismaClient.user.count({
        where: { followings: { some: { id } } },
      });
    },

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      return id === loggedInUser.id;
    },

    isFollowing: async ({ id }, _, { prismaClient, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const isFollowing = await prismaClient.user.count({
        where: { id: loggedInUser.id, followings: { some: { id } } },
      });

      return Boolean(isFollowing);
    },

    photos: ({ id }, _, { prismaClient }) => {
      return prismaClient.user.findUnique({ where: { id } }).photos();
    },
  },
};

export default resolvers;
