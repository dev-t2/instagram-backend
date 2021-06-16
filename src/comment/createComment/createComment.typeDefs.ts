import { gql } from 'apollo-server-express';

export default gql`
  type CreateCommentResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    createComment(photoId: Int!, comment: String!): CreateCommentResult
  }
`;
