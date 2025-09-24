import gql from "graphql-tag";

const getProfileByUserId = gql`
  query getProfileByUserId($userId: String!) {
    profile: getProfileByUserId(userId: $userId) {
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
      following
      followedBy
    }
  }
`;

export default getProfileByUserId;
