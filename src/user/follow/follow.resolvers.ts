import { Resolver, Resolvers } from '../../types';
import { checkLogin } from '../user.utils';

const resolver: Resolver = async (
  _,
  { nickname },
  { client, loggedInUser }
) => {
  const user = await client.user.findUnique({
    where: { nickname },
    select: { id: true },
  });

  if (!user) {
    return { isSuccess: false, error: 'User does not exist' };
  }

  await client.user.update({
    where: { id: loggedInUser.id },
    data: { followings: { connect: { nickname } } },
  });

  return { isSuccess: true };
};

const resolvers: Resolvers = {
  Mutation: { follow: checkLogin(resolver) },
};

export default resolvers;
