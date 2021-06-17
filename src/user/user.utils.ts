import * as jwt from 'jsonwebtoken';

import { Context, Resolver } from '../types';
import prismaClient from '../prismaClient';

export const loggedInUser = async token => {
  if (!token) {
    return null;
  }

  const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);

  if (verifiedToken?.id) {
    const user = await prismaClient.user.findUnique({
      where: { id: verifiedToken.id },
    });

    return user;
  }

  return null;
};

export const checkLogin = (resolver: Resolver) => {
  return (root, args, context: Context, info) => {
    const { loggedInUser } = context;

    if (!loggedInUser) {
      const isQuery = info.operation.operation === 'query';

      if (isQuery) {
        return null;
      }

      return { isSuccess: false, error: 'Login is required' };
    }

    return resolver(root, args, context, info);
  };
};
