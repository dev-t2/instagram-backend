import { gql } from 'apollo-server-express';

export default gql`
  type Photo {
    id: Int!
    user: User!
    url: String!
    caption: String
    hashTags: [HashTag]
    like: Int
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type HashTag {
    id: Int!
    hashTag: String!
    photos(page: Int!): [Photo]
    totalPhoto: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
