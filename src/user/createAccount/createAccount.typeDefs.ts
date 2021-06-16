import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createAccount(
      name: String!
      nickname: String!
      email: String!
      password: String!
    ): CommonMutationResult
  }
`;
