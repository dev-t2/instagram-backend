import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: checkLogin(
      async (_, { id }, { prismaClient, loggedInUser }) => {
        const comment = await prismaClient.comment.findUnique({
          where: { id },
          select: { userId: true },
        });

        if (!comment) {
          return { isSuccess: false, error: 'Comment Not Found' };
        }

        if (comment.userId !== loggedInUser.id) {
          return { isSuccess: false, error: 'Comment Not Permission' };
        }

        await prismaClient.comment.delete({ where: { id } });

        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
