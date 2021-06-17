import 'dotenv/config';

import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as morgan from 'morgan';

import { typeDefs, resolvers } from './graphqlSchema';
import prismaClient from './prismaClient';
import { loggedInUser } from './user/user.utils';

const app = express();
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    prismaClient,
    loggedInUser: await loggedInUser(req.headers.token),
  }),
});
const { PORT } = process.env;

app.use(morgan('tiny'));
apollo.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});
