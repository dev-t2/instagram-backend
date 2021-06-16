import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    updateProfile(
      name: String
      nickname: String
      email: String
      password: String
      aboutMe: String
      avatar: Upload
    ): CommonMutationResult
  }
`;
