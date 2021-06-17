import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    updateComment: checkLogin(
      async (_, { id, text }, { prismaClient, loggedInUser }) => {
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

        await prismaClient.comment.update({
          where: { id },
          data: { comment: text },
        });

        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
