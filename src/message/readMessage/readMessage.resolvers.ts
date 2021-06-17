import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    readMessage: async (_, { id }, { prismaClient, loggedInUser }) => {
      const message = await prismaClient.message.findFirst({
        where: {
          id,
          room: { users: { some: { id: loggedInUser.id } } },
          userId: { not: loggedInUser.id },
        },
        select: { id: true },
      });

      if (!message) {
        return { isSuccess: false, error: 'Message Not Found' };
      }

      await prismaClient.message.update({
        where: { id },
        data: { isRead: true },
      });

      return { isSuccess: true };
    },
  },
};

export default resolvers;
