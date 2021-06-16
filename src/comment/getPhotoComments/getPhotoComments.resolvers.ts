import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getPhotoComments: (_, { id }, { client }) => {
      return client.comment.findMany({
        where: { photoId: id },
        orderBy: { createdAt: 'asc' },
      });
    },
  },
};

export default resolvers;
