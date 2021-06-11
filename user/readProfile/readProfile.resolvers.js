import client from '../../prisma/client';

export default {
  Query: {
    readProfile: async (_, { userName }) => {
      const user = await client.user.findUnique({
        where: { userName },
        include: {
          follower: true,
          following: true,
        },
      });

      return user;
    },
  },
};
