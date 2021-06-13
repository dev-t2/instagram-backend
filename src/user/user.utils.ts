import * as jwt from 'jsonwebtoken';

import { Context, Resolver } from '../types';
import client from '../client';

export const getUser = async token => {
  try {
    if (!token) {
      return null;
    }

    const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);

    if (verifiedToken?.id) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken.id },
      });

      return user;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const protectedResolver = (resolver: Resolver) => {
  return (root, args, context: Context, info) => {
    if (!context.loggedInUser) {
      return { isSuccess: false, error: 'Login is required' };
    }

    return resolver(root, args, context, info);
  };
};
