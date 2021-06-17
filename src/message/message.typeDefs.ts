import { gql } from 'apollo-server-express';

export default gql`
  type Room {
    id: Int!
    users: [User]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }

  type Message {
    id: Int!
    room: Room!
    user: User!
    message: String!
    createdAt: String!
    updatedAt: String!
  }
`;
