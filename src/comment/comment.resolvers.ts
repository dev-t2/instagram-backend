import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      return userId === loggedInUser?.id;
    },
  },
};

export default resolvers;
