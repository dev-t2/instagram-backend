import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { getUser } from './user';

dotenv.config();

const { PORT } = process.env;
const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    loggedInUser: await getUser(req.headers.token),
  }),
});

server
  .listen()
  .then(() => console.log(`🚀 Server is running on http://localhost:${PORT}`));
