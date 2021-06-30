import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      return userId === loggedInUser.id;
    },
  },
};

export default resolvers;
