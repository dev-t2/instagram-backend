import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    readProfile(userName: String!): User
  }
`;
