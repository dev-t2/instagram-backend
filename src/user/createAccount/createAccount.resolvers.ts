import * as bcrypt from 'bcrypt';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password },
      { client }
    ) => {
      try {
        const isUser = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });

        if (isUser) {
          throw new Error('userName or email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
          },
        });

        return { isSuccess: true };
      } catch (error) {
        return { isSuccess: false, error };
      }
    },
  },
};
