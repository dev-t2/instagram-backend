import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    uploadPhoto(photo: Upload!, caption: String): Photo
  }
`;
