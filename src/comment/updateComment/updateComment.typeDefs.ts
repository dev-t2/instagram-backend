import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    updateComment(id: Int!, text: String!): CommonMutationResult
  }
`;
