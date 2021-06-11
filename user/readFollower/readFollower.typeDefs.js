import { gql } from 'apollo-server-express';

export default gql`
  type readFollowerResult {
    isSuccess: Boolean!
    follower: [User]
    totalPage: Int
    error: String
  }

  type Query {
    readFollower(userName: String!, page: Int!): readFollowerResult
  }
`;
