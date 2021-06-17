import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    sendMessage(
      message: String!
      userId: Int
      roomId: Int
    ): CommonMutationResult
  }
`;
