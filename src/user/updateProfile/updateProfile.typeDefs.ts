import { gql } from 'apollo-server-express';

export default gql`
  type UpdateProfileResult {
    isSuccess: Boolean!
    error: String
  }

  type Mutation {
    updateProfile(
      name: String
      nickname: String
      email: String
      password: String
      aboutMe: String
      avatar: Upload
    ): UpdateProfileResult
  }
`;
