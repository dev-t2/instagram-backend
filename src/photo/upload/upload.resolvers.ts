import { Resolver, Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.utils';
import { parseHashTags } from '../photo.utils';

const resolver: Resolver = async (
  _,
  { file, caption },
  { client, loggedInUser }
) => {
  const hashTags = parseHashTags(caption);

  return client.photo.create({
    data: {
      user: { connect: { id: loggedInUser.id } },
      file,
      caption,
      hashTags,
    },
  });
};

const resolvers: Resolvers = {
  Mutation: {
    upload: protectedResolver(resolver),
  },
};

export default resolvers;
