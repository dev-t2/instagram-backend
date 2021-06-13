import { Resolver, Resolvers } from '../../types';
import { protectedResolver } from '../../user/user.utils';

const resolver: Resolver = async (
  _,
  { file, caption },
  { client, loggedInUser }
) => {
  let hashTags;

  if (caption) {
    const matchedHashTags = caption.match(/#[\w]+/g);

    if (matchedHashTags) {
      hashTags = {
        connectOrCreate: matchedHashTags.map(hashTag => ({
          where: { hashTag },
          create: { hashTag },
        })),
      };
    }
  }

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
