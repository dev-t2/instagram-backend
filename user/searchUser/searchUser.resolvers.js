import client from '../../prisma/client';

export default {
  Query: {
    searchUsers: async (_, { keyword }) => {
      const users = await client.user.findMany({
        where: { userName: { startsWith: keyword } },
      });

      return users;
    },
  },
};
