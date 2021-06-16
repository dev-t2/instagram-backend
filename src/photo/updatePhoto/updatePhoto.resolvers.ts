import { Resolver, Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.utils';
import { parseHashTags } from '../photo.utils';

const resolver: Resolver = async (
  _,
  { id, caption },
  { client, loggedInUser }
) => {
  const photo = await client.photo.findFirst({
    where: { id, userId: loggedInUser.id },
    include: { hashTags: { select: { hashTag: true } } },
  });

  if (!photo) {
    return { isSuccess: false, error: 'No photos found' };
  }

  await client.photo.update({
    where: { id },
    data: {
      caption,
      hashTags: { disconnect: photo.hashTags, ...parseHashTags(caption) },
    },
  });

  return { isSuccess: true };
};

const resolvers: Resolvers = {
  Mutation: {
    updatePhoto: protectedResolver(resolver),
  },
};

export default resolvers;
