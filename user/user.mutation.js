import client from '../client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      const isUser = await client.user.findUnique({
        where: { OR: [{ userName }, { email }] },
      });

      console.log(isUser);
    },
  },
};
