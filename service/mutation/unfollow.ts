import gql from "graphql-tag";

const unfollow = gql`
  mutation unfollow($otherUserId: ID!) {
    profile: unfollow(otherUserId: $otherUserId) {
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

export default unfollow;
