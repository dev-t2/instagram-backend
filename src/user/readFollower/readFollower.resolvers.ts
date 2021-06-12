import client from '../../client';

export default {
  Query: {
    readFollower: async (_, { userName, page }) => {
      const user = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });

      if (!user) {
        return { isSuccess: false, error: 'User does not exist' };
      }

      const pageSize = 5;

      const follower = await client.user
        .findUnique({ where: { userName } })
        .follower({ skip: (page - 1) * pageSize, take: pageSize });

      const totalFollower = await client.user.count({
        where: { following: { some: { userName } } },
      });

      const totalPage = Math.ceil(totalFollower / pageSize);

      return { isSuccess: true, follower, totalPage };
    },
  },
};
