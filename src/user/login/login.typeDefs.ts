import { gql } from 'apollo-server-express';

export default gql`
  type LoginResult {
    isSuccess: Boolean!
    token: String
    error: String
  }

  type Mutation {
    login(userName: String!, password: String!): LoginResult
  }
`;
