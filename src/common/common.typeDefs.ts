import { gql } from 'apollo-server-express';

export default gql`
  type CommonResponse {
    isSuccess: Boolean!
    error: String
  }
`;
