import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getRoom(id: Int!): Room
  }
`;
