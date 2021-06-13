import { gql } from 'apollo-server-express';

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashTags: [HashTag]
    createdAt: String!
    updatedAt: String!
  }

  type HashTag {
    id: Int!
    hashTag: String!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }
`;
