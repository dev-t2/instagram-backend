import { Resolvers } from '../../types';
import { checkLogin } from '../user.utils';

const resolver = async (_, { nickname }, { client, loggedInUser }) => {
  const user = await client.user.findUnique({
    where: { nickname },
    select: { id: true },
  });

  if (!user) {
    return { isSuccess: false, error: 'User does not exist' };
  }

  await client.user.update({
    where: { id: loggedInUser.id },
    data: { following: { disconnect: { nickname } } },
  });

  return { isSuccess: true };
};

const resolvers: Resolvers = {
  Mutation: { unfollow: checkLogin(resolver) },
};

export default resolvers;
