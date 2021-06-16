import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    deleteComment(id: Int!): CommonMutationResult
  }
`;
