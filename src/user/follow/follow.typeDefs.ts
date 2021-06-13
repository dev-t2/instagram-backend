import { gql } from 'apollo-server-express';

export default gql`
  type FollowResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    follow(nickName: String!): FollowResult
  }
`;