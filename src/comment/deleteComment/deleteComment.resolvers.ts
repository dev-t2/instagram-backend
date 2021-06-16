import { Resolver, Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.utils';

const resolver: Resolver = async (_, { id }, { client, loggedInUser }) => {
  const comment = await client.comment.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!comment) {
    return { isSuccess: false, error: 'Comment Not Found' };
  }

  if (comment.userId !== loggedInUser.id) {
    return { isSuccess: false, error: 'Comment Not Permission' };
  }

  await client.comment.delete({ where: { id } });

  return { isSuccess: true };
};

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(resolver),
  },
};

export default resolvers;
