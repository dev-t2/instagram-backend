import { Resolver, Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolver: Resolver = (_, __, { client, loggedInUser }) => {
  return client.photo.findMany({
    where: {
      OR: [
        { user: { followers: { some: { id: loggedInUser.id } } } },
        { userId: loggedInUser.id },
      ],
    },
    orderBy: { updatedAt: 'desc' },
  });
};

const resolvers: Resolvers = {
  Query: {
    getFeed: checkLogin(resolver),
  },
};

export default resolvers;
