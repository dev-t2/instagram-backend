import client from '../../prisma/client';
import { protectedResolver } from '../user.utils';

const resolver = async (_, { userName }, { loggedInUser }) => {
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
  Mutation: {
    followUser: protectedResolver(resolver),
  },
};
