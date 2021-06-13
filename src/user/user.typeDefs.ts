import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    name: String!
    nickName: String!
    email: String!
    aboutMe: String
    avatar: String
    follower: [User]
    following: [User]
    totalFollower: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
