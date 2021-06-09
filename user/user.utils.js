import jwt from 'jsonwebtoken';
import client from '../prisma/client';

export const getUser = async token => {
  try {
    if (!token) {
      return null;
    }

    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};

export const protectedResolver = resolver => {
  return (root, args, context, info) => {
    if (!context.loggedInUser) {
      return { isSuccess: false, error: 'User authentication is required' };
    }

    return resolver(root, args, context, info);
  };
};
