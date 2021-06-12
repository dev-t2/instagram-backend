import { Resolver } from '../../types';
import { protectedResolver } from '../user.utils';

const resolver: Resolver = async (
  _,
  { userName },
  { loggedInUser, client }
) => {
  const user = await client.user.findUnique({ where: { userName } });

  if (!user) {
    return { isSuccess: false, error: 'User does not exist' };
  }

  await client.user.update({
    where: { id: loggedInUser.id },
    data: { following: { connect: { userName } } },
  });

  return { isSuccess: true };
};

export default {
  Mutation: { followUser: protectedResolver(resolver) },
};
