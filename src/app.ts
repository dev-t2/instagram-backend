import 'dotenv/config';

import * as http from 'http';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as morgan from 'morgan';

import { connectionParams } from './types';
import { typeDefs, resolvers } from './graphqlSchema';
import prismaClient from './prismaClient';
import { loggedInUser } from './user/user.utils';

const { PORT } = process.env;
const app = express();
const httpServer = http.createServer(app);
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: async ({ token }: connectionParams) => {
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      return {
        loggedInUser: await loggedInUser(token),
      };
    },
  },
  context: async ctx => {
    if (ctx.req) {
      return {
        prismaClient,
        loggedInUser: await loggedInUser(ctx.req.headers.token),
      };
    }

    return { prismaClient, loggedInUser: ctx.connection.context.loggedInUser };
  },
});

app.use(morgan('tiny'));
apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});
