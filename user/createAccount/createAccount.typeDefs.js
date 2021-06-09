import { gql } from 'apollo-server';

export default gql`
  type CreateAccountResult {
    result: Boolean!
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
