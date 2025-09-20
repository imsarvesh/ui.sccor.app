import gql from "graphql-tag";

const getProfileByUsername = gql`
  query getProfileByUsername($username: String!) {
    profile: getProfileByUsername(username: $username) {
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

export default getProfileByUsername;
