import * as jwt from 'jsonwebtoken';

import { Context, Resolver } from '../types';
import prismaClient from '../prismaClient';

export const loggedInUser = async token => {
  if (!token) {
    return null;
  }

  try {
    const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);

    if (verifiedToken?.id) {
      const user = await prismaClient.user.findUnique({
        where: { id: verifiedToken.id },
      });

      return user;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const checkLogin = (resolver: Resolver) => {
  return (root, args, context: Context, info) => {
    const { loggedInUser } = context;

    if (!loggedInUser) {
      const isQuery = info.operation.operation === 'query';

      if (isQuery) {
        return null;
      }

      return { isSuccess: false, error: '로그인이 필요합니다.' };
    }

    return resolver(root, args, context, info);
  };
};
