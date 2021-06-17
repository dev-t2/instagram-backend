import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getPhoto: (_, { id }, { prismaClient }) => {
      return prismaClient.photo.findUnique({ where: { id } });
    },
  },
};

export default resolvers;
