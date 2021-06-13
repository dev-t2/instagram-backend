import { gql } from 'apollo-server-express';

export default gql`
  type GetFollowerResult {
    isSuccess: Boolean!
    follower: [User]
    totalPage: Int
    error: String
  }

  type Query {
    getFollower(nickname: String!, page: Int!): GetFollowerResult
  }
`;
