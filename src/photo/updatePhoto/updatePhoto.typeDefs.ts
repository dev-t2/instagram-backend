import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    updatePhoto(id: Int!, caption: String!): CommonResult!
  }
`;
