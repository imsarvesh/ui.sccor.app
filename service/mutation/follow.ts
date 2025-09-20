import gql from "graphql-tag";

const follow = gql`
  mutation follow($otherUserId: ID!) {
    profile: follow(otherUserId: $otherUserId) {
      id
      name
      username
      image
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
      __typename
    }
  }
`;

export default follow;
