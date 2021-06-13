import { gql } from 'apollo-server-express';

export default gql`
  type GetFollowingResult {
    isSuccess: Boolean!
    following: [User]
    totalPage: Int
    error: String
  }

  type Query {
    getFollowing(nickname: String!, page: Int, lastId: Int): GetFollowingResult
  }
`;
