import jwt from 'jsonwebtoken';

import { Context, Resolver } from '../types';
import client from '../client';

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

export const protectedResolver = (resolver: Resolver) => {
  return (root, args, context: Context, info) => {
    if (!context.loggedInUser) {
      return { isSuccess: false, error: 'User authentication is required' };
    }

    return resolver(root, args, context, info);
  };
};
