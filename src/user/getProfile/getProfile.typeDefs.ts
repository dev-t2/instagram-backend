import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getProfile(nickname: String!): User
  }
`;
