import { Resolvers } from '../../types';
import { checkLogin } from '../user.utils';

const resolvers: Resolvers = {
  Query: {
    me: checkLogin((_, __, { prismaClient, loggedInUser }) => {
      return prismaClient.user.findUnique({ where: { id: loggedInUser.id } });
    }),
  },
};

export default resolvers;
