import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getHashTag: (_, { hashTag }, { client }) => {
      return client.hsahTag.findUnique({ where: { hashTag } });
    },
  },
};

export default resolvers;
