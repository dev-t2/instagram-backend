import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolvers: Resolvers = {
  Query: {
    getRoom: checkLogin(async (_, { id }, { prismaClient, loggedInUser }) => {
      return prismaClient.room.findFirst({
        where: { id, users: { some: { id: loggedInUser.id } } },
      });
    }),
  },
};

export default resolvers;
