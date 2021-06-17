import pubsub from '../../apolloPubSub';
import { NEW_MESSAGE } from '../../constant';

const resolvers = {
  Subscription: {
    updateRoom: {
      subscribe: () => {
        return pubsub.asyncIterator(NEW_MESSAGE);
      },
    },
  },
};

export default resolvers;
