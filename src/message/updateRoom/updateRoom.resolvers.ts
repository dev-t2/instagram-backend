import { withFilter } from 'apollo-server-express';
import { Resolvers } from '../../types';
import pubsub, { NEW_MESSAGE } from '../../apolloPubSub';

const resolvers: Resolvers = {
  Subscription: {
    updateRoom: {
      subscribe: async (root, args, context, info) => {
        const room = await context.prismaClient.room.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loggedInUser.id } },
          },
          select: { id: true },
        });

        if (!room) {
          throw new Error('Room Not Found');
        }

        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ updateRoom }, { id }, { loggedInUser }) => {
            if (updateRoom.roomId === id) {
              const room = await context.prismaClient.room.findFirst({
                where: {
                  id,
                  users: { some: { id: loggedInUser.id } },
                },
                select: { id: true },
              });

              if (!room) {
                return false;
              }

              return true;
            }

            return false;
          }
        )(root, args, context, info);
      },
    },
  },
};

export default resolvers;
