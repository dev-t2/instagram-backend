export default {
  Query: {
    readFollowing: async (_, { userName, lastId }, { client }) => {
      const user = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      const following = await client.user
        .findUnique({ where: { userName } })
        .following({
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          take: 5,
        });

      return { isSuccess: true, following };
    },
  },
};
