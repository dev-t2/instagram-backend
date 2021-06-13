import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getPhoto(id: Int!): Photo
  }
`;
