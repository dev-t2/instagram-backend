import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    follow(nickname: String!): CommonResponse
  }
`;
