import { gql } from 'apollo-server-express';

export default gql`
  type GetFollowingResult {
    isSuccess: Boolean!
    following: [User]
    error: String
  }

  type Query {
    getFollowing(nickname: String!, lastId: Int): GetFollowingResult
  }
`;
