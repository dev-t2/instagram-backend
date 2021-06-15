import { Resolver, Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.utils';

const resolver: Resolver = async (_, { id }, { client, loggedInUser }) => {
  const photo = await client.photo.findUnique({ where: { id } });

  if (!photo) {
    return { isSuccess: false, error: 'No photos found' };
  }

  const where = { photoId_userId: { photoId: id, userId: loggedInUser.id } };
  const like = await client.like.findUnique({ where });

  if (like) {
    await client.like.delete({ where });
  } else {
    await client.like.create({
      data: {
        user: { connect: { id: loggedInUser.id } },
        photo: { connect: { id: photo.id } },
      },
    });
  }

  return { isSuccess: true };
};

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(resolver),
  },
};

export default resolvers;
