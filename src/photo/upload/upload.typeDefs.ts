import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    upload(url: String!, caption: String): Photo
  }
`;
