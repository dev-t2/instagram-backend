import { gql } from 'apollo-server-express';

export default gql`
  type GetFollowerResult {
    isSuccess: Boolean!
    follower: [User]
    totalPage: Int
    error: String
  }

  type Query {
    getFollower(nickName: String!, page: Int!): GetFollowerResult
  }
`;
