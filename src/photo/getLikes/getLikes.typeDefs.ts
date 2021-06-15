import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getLikes(id: Int!): [User]
  }
`;
