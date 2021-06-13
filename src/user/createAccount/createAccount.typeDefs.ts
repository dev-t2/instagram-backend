import { gql } from 'apollo-server-express';

export default gql`
  type CreateAccountResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      name: String!
      nickname: String!
      email: String!
      password: String!
    ): CreateAccountResult
  }
`;
