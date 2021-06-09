import client from '../../prisma/client';

export default {
  Query: {
    readProfile: async (_, { userName }) => {
      try {
        const user = await client.user.findUnique({ where: { userName } });

        return user;
      } catch (error) {
        return error;
      }
    },
  },
};
