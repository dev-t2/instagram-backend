import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getPhotoComments: (_, { id }, { prismaClient }) => {
      return prismaClient.comment.findMany({
        where: { photoId: id },
        orderBy: { createdAt: 'asc' },
      });
    },
  },
};

export default resolvers;
