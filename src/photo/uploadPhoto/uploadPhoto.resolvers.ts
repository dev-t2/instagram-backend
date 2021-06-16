import { Resolver, Resolvers } from '../../types';
import { uploadToS3 } from '../../common/common.utils';
import { checkLogin } from '../../user/user.utils';
import { parseHashTags } from '../photo.utils';

const resolver: Resolver = async (
  _,
  { photo, caption },
  { client, loggedInUser }
) => {
  const hashTags = parseHashTags(caption);
  const photoUrl = await uploadToS3('photo', photo);

  return client.photo.create({
    data: {
      user: { connect: { id: loggedInUser.id } },
      url: photoUrl,
      caption,
      hashTags,
    },
  });
};

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: checkLogin(resolver),
  },
};

export default resolvers;
