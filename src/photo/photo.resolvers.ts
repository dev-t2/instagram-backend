import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { prismaClient }) => {
      return prismaClient.user.findUnique({ where: { id: userId } });
    },

    hashTags: ({ id }, _, { prismaClient }) => {
      return prismaClient.hsahTag.findMany({
        where: { photos: { some: { id } } },
      });
    },

    like: ({ id }, _, { prismaClient }) => {
      return prismaClient.like.count({ where: { photoId: id } });
    },

    comment: ({ id }, _, { prismaClient }) => {
      return prismaClient.comment.count({ where: { photoId: id } });
    },

    isMine: ({ userId }, _, { loggedInUser }) => {
      return userId === loggedInUser?.id;
    },
  },

  HashTag: {
    photos: ({ id }, { page }, { prismaClient }) => {
      console.log(page);

      return prismaClient.hsahTag.findUnique({ where: { id } }).photos();
    },

    totalPhoto: ({ id }, _, { prismaClient }) => {
      return prismaClient.photo.count({
        where: { hashTags: { some: { id } } },
      });
    },
  },
};

export default resolvers;
