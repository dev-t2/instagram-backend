import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
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

server
  .listen()
  .then(() => console.log(`🚀 Server is running on http://localhost:${PORT}`));
