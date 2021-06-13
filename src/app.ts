import 'dotenv/config';

import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as morgan from 'morgan';

import { typeDefs, resolvers } from './schema';
import client from './client';
import { getUser } from './user/user.utils';

const { PORT } = process.env;

const app = express();

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    client,
    loggedInUser: await getUser(req.headers.token),
  }),
});

app.use(morgan('tiny'));
app.use('/static', express.static('upload'));

apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});
