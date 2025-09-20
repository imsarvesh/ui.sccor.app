import gql from "graphql-tag";

const getFollowingByUsername = gql`
  query getFollowingByUsername($username: String!) {
    following: getFollowing(username: $username, limit: 10) {
      profiles {
        id
        name
        image
      }
      nextToken
    }
  }
`;

export default getFollowingByUsername;
