import { gql } from 'apollo-server-express';

export default gql`
  type ToggleLikeResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    toggleLike(id: Int!): ToggleLikeResult
  }
`;
