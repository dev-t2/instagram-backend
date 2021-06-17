import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getHashTag: (_, { hashTag }, { prismaClient }) => {
      return prismaClient.hsahTag.findUnique({ where: { hashTag } });
    },
  },
};

export default resolvers;
