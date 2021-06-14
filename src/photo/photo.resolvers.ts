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

  HashTag: {
    photos: ({ id }, { page }, { client }) => {
      console.log(page);

      return client.hsahTag.findUnique({ where: { id } }).photos();
    },

    totalPhoto: ({ id }, _, { client }) => {
      return client.photo.count({ where: { hashTags: { some: { id } } } });
    },
  },
};

export default resolvers;