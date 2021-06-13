import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    getPhoto: (_, { id }, { client }) => {
      return client.photo.findUnique({ where: { id } });
    },
  },
};

export default resolvers;
