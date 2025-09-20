import gql from "graphql-tag";

const getFollowersByUsername = gql`
  query getFollowersByUsername($username: String!) {
    followers: getFollowers(username: $username, limit: 10) {
      profiles {
        id
        name
        image
      }
      nextToken
    }
  }
`;

export default getFollowersByUsername;
