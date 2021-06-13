import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    name: String!
    nickname: String!
    email: String!
    aboutMe: String
    avatar: String
    followers: [User]
    followings: [User]
    totalFollower: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
