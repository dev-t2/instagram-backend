import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    upload(file: String!, caption: String): Photo
  }
`;
