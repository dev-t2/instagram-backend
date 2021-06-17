import 'dotenv/config';

import * as http from 'http';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as morgan from 'morgan';

import { typeDefs, resolvers } from './graphqlSchema';
import prismaClient from './prismaClient';
import { loggedInUser } from './user/user.utils';

const { PORT } = process.env;
const app = express();
const httpServer = http.createServer(app);
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      return {
        prismaClient,
        loggedInUser: await loggedInUser(req.headers.token),
      };
    }

    return { prismaClient };
  },
});

app.use(morgan('tiny'));
apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});
