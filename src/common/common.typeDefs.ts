import { gql } from 'apollo-server-express';

export default gql`
  type CommonResult {
    isSuccess: Boolean!
    id: Int
    error: String
  }
`;
