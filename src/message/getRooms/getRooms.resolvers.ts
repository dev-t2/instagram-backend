import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolvers: Resolvers = {
  Query: {
    getRooms: checkLogin(async (_, __, { prismaClient, loggedInUser }) => {
      return prismaClient.room.findMany({
        where: { users: { some: { id: loggedInUser.id } } },
      });
    }),
  },
};

export default resolvers;
