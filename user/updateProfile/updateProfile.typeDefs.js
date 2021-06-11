import { gql } from 'apollo-server-express';

export default gql`
  type UpdateProfileResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    updateProfile(
      firstName: String
      lastName: String
      userName: String
      email: String
      password: String
      aboutMe: String
      avatar: Upload
    ): UpdateProfileResult
  }
`;
