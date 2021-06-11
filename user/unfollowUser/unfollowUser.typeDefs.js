import { gql } from 'apollo-server-express';

export default gql`
  type unfollowUserResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(userName: String!): unfollowUserResult
  }
`;
