import { gql } from 'apollo-server-express';

export default gql`
  type UpdatePhotoResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    updatePhoto(id: Int!, caption: String!): UpdatePhotoResult
  }
`;
