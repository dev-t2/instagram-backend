import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Commnet: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      return userId === loggedInUser?.id;
    },
  },
};

export default resolvers;
