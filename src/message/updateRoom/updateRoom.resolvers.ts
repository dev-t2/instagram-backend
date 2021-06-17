import { withFilter } from 'apollo-server-express';
import { Resolvers } from '../../types';
import pubsub, { NEW_MESSAGE } from '../../apolloPubSub';

const resolvers: Resolvers = {
  Subscription: {
    updateRoom: {
      subscribe: async (root, args, context, info) => {
        const room = await context.prismaClient.room.findUnique({
          where: { id: args.id },
          select: { id: true },
        });

        if (!room) {
          throw new Error('Room Not Found');
        }

        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ updateRoom }, { id }) => updateRoom.roomId === id
        )(root, args, context, info);
      },
    },
  },
};

export default resolvers;
