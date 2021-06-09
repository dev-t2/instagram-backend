import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import schema from './schema';

dotenv.config();

const { PORT } = process.env;
const server = new ApolloServer({ schema });

server
  .listen()
  .then(() => console.log(`🚀 Server is running on http://localhost:${PORT}`));
