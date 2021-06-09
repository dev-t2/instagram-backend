import client from '../client';

export default {
  Query: {
    getProfile: async (_, { userName }) => {
      try {
        const user = await client.user.findUnique({ where: { userName } });

        return user;
      } catch (error) {
        return error;
      }
    },
  },
};
