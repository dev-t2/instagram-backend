import { gql } from 'apollo-server';

export default gql`
  type CreateAccountResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      userName: String!
      email: String!
      password: String!
    ): CreateAccountResult
  }
`;
