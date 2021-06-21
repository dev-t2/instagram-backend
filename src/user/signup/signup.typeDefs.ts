import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    signup(
      name: String!
      nickname: String!
      email: String!
      password: String!
    ): CommonResult
  }
`;
