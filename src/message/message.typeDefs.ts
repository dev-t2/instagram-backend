import { gql } from 'apollo-server-express';

export default gql`
  type Room {
    id: Int!
    users: [User]
    messages: [Message]
    unreadMessage: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Message {
    id: Int!
    room: Room!
    user: User!
    message: String!
    isRead: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
