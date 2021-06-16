import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getPhotoComments(id: Int!): [Comment]
  }
`;
