import { Resolver, Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolver: Resolver = async (_, { id }, { client, loggedInUser }) => {
  const photo = await client.photo.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!photo) {
    return { isSuccess: false, error: 'Photo Not Found' };
  }

  if (photo.userId !== loggedInUser.id) {
    return { isSuccess: false, error: 'Photo Not Permission' };
  }

  await client.photo.delete({ where: { id } });

  return { isSuccess: true };
};

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: checkLogin(resolver),
  },
};

export default resolvers;
