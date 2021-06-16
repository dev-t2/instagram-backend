import { Resolver, Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolver: Resolver = async (
  _,
  { id, text },
  { client, loggedInUser }
) => {
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

  await client.comment.update({ where: { id }, data: { comment: text } });

  return { isSuccess: true };
};

const resolvers: Resolvers = {
  Mutation: {
    updateComment: checkLogin(resolver),
  },
};

export default resolvers;
