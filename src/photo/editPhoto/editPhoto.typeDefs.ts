import { gql } from 'apollo-server-express';

export default gql`
  type EditPhotoResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    editPhoto(id: Int!, caption: String!): EditPhotoResult
  }
`;
