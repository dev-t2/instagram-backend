import { protectedResolver } from '../user.utils';

const resolver = async (_, { userName }, { client, loggedInUser }) => {
  const user = await client.user.findUnique({ where: { userName } });

  if (!user) {
    return { isSuccess: false, error: 'User does not exist' };
  }

  await client.user.update({
    where: { id: loggedInUser.id },
    data: { following: { disconnect: { userName } } },
  });

  return { isSuccess: true };
};

export default {
  Mutation: { unfollowUser: protectedResolver(resolver) },
};
