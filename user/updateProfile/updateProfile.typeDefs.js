import { gql } from 'apollo-server';

export default gql`
  type UpdateProfileResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    updateProfile(
      token: String!
      firstName: String
      lastName: String
      userName: String
      email: String
      password: String
    ): UpdateProfileResult
  }
`;
