import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) => {
      return client.user.findUnique({ where: { id: userId } });
    },

    hashTags: ({ id }, _, { client }) => {
      return client.hsahTag.findMany({ where: { photos: { some: { id } } } });
    },
  },
};

export default resolvers;
