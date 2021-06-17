import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Room: {
    users: ({ id }, _, { prismaClient }) => {
      return prismaClient.room.findUnique({ where: { id } }).users();
    },

    messages: ({ id }, _, { prismaClient }) => {
      return prismaClient.message.findMany({ where: { roomId: id } });
    },

    unreadMessage: ({ id }, _, { prismaClient, loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }

      return prismaClient.message.count({
        where: {
          roomId: id,
          user: { id: { not: loggedInUser.id } },
          isRead: false,
        },
      });
    },
  },
};

export default resolvers;
