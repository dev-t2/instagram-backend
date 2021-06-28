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
      if (!loggedInUser) {
        return false;
      }

      return userId === loggedInUser.id;
    },

    isLiked: async ({ id }, _, { prismaClient, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const like = await prismaClient.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (!like) {
        return false;
      }

      return true;
    },
  },

  HashTag: {
    photos: ({ id }, _, { prismaClient }) => {
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
