import { gql } from "@apollo/client";

const getMyProfile = gql`
  query getMyProfile {
    profile: getMyProfile {
      id
      name
      username
      image
      email
      bio
      location
      website
      birthdate
      createdAt
      followersCount
      followingCount
      postsCount
      __typename
    }
  }
`;

export default getMyProfile;
