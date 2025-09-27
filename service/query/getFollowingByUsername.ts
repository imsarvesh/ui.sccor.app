import { gql } from "@apollo/client";

const getFollowingByUsername = gql`
  query getFollowingByUsername(
    $username: String!
    $nextToken: String
    $limit: Int
  ) {
    following: getFollowing(
      username: $username
      limit: $limit
      nextToken: $nextToken
    ) {
      profiles {
        id
        name
        image
        bio
        username
      }
      nextToken
    }
  }
`;

export default getFollowingByUsername;
