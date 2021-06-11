import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    aboutMe: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }
`;
