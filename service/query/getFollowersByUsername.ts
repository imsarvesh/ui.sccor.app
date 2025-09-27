import { gql } from "@apollo/client";

const getFollowersByUsername = gql`
  query getFollowersByUsername(
    $username: String!
    $nextToken: String
    $limit: Int
  ) {
    followers: getFollowers(
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

export default getFollowersByUsername;
