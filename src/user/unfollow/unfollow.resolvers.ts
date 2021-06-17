import { Resolvers } from '../../types';
import { checkLogin } from '../user.utils';

const resolvers: Resolvers = {
  Mutation: {
    unfollow: checkLogin(
      async (_, { nickname }, { prismaClient, loggedInUser }) => {
        const user = await prismaClient.user.findUnique({
          where: { nickname },
          select: { id: true },
        });

        if (!user) {
          return { isSuccess: false, error: 'User does not exist' };
        }

        await prismaClient.user.update({
          where: { id: loggedInUser.id },
          data: { followings: { disconnect: { nickname } } },
        });

        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
