import { gql } from 'apollo-server-express';

export default gql`
  type CreateAccountResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      name: String!
      nickName: String!
      email: String!
      password: String!
    ): CreateAccountResult
  }
`;
