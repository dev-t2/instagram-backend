import { gql } from 'apollo-server-express';

export default gql`
  type UpdateCommentResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    updateComment(id: Int!, text: String!): UpdateCommentResult
  }
`;
