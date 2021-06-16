import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) => {
      return client.user.findUnique({ where: { id: userId } });
    },

    hashTags: ({ id }, _, { client }) => {
      return client.hsahTag.findMany({ where: { photos: { some: { id } } } });
    },

    like: ({ id }, _, { client }) => {
      return client.like.count({ where: { photoId: id } });
    },

    comment: ({ id }, _, { client }) => {
      return client.comment.count({ where: { photoId: id } });
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
