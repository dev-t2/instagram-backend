import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    searchPhotos: (_, { keyword }, { prismaClient }) => {
      return prismaClient.photo.findMany({
        where: { caption: { contains: keyword } },
      });
    },
  },
};

export default resolvers;
