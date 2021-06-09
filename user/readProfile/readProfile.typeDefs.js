import { gql } from 'apollo-server';

export default gql`
  type Query {
    readProfile(userName: String!): User
  }
`;
