import { gql } from "@apollo/client";

const editMyProfile = gql`
  mutation editMyProfile($newProfile: ProfileInput!) {
    profile: editMyProfile(newProfile: $newProfile) {
      id
      name
      username
      image
      bio
      email
      location
      website
      birthdate
      createdAt
      updateAt
      followersCount
      followingCount
      postsCount
      likesCounts
    }
  }
`;

export default editMyProfile;
