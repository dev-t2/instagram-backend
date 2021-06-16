import { Resolver, Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolver: Resolver = async (
  _,
  { photoId, comment },
  { client, loggedInUser }
) => {
  const photo = await client.photo.findUnique({
    where: { id: photoId },
    select: { id: true },
  });

  if (!photo) {
    return { isSuccess: false, error: 'No photos found' };
  }

  await client.comment.create({
    data: {
      user: { connect: { id: loggedInUser.id } },
      photo: { connect: { id: photoId } },
      comment,
    },
  });

  return { isSuccess: true };
};

const resolvers: Resolvers = {
  Mutation: {
    createComment: checkLogin(resolver),
  },
};

export default resolvers;
