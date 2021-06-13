import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getProfile(nickName: String!): User
  }
`;
