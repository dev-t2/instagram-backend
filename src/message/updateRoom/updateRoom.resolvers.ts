import { withFilter } from 'apollo-server-express';
import pubsub, { NEW_MESSAGE } from '../../apolloPubSub';

const resolvers = {
  Subscription: {
    updateRoom: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        ({ updateRoom }, { id }) => updateRoom.roomId === id
      ),
    },
  },
};

export default resolvers;
