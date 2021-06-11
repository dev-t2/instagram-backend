import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import morgan from 'morgan';

import { typeDefs, resolvers } from './schema';
import { getUser } from './user/user.utils';

dotenv.config();

const { PORT } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    loggedInUser: await getUser(req.headers.token),
  }),
});

const app = express();

server.applyMiddleware({ app });

app.use(morgan('tiny'));
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});
