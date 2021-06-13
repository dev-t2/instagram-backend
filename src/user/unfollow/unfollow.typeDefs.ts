import { gql } from 'apollo-server-express';

export default gql`
  type unfollowResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    unfollow(nickname: String!): unfollowResult
  }
`;
