import { gql } from 'apollo-server-express';

export default gql`
  type ReadFollowingResult {
    isSuccess: Boolean!
    following: [User]
    error: String
  }

  type Query {
    readFollowing(userName: String!, lastId: Int): ReadFollowingResult
  }
`;
