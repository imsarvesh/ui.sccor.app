import { gql } from "@apollo/client";

const search = gql`
  query search(
    $query: String!
    $mode: SearchMode!
    $isHashTag: Boolean
    $limit: Int
    $nextToken: String
  ) {
    search(
      input: { query: $query, mode: $mode, isHashTag: $isHashTag }
      limit: $limit
      nextToken: $nextToken
    ) {
      results {
        ... on Post {
          id
          text
          __typename
        }
        ... on Reply {
          id
          text
          __typename
        }
        ... on OtherProfile {
          __typename
          name
          id
          bio
          email
        }
        ... on Tournament {
          id
          name
          sportType
        }
        ... on Match {
          id
          name
          sportType
        }
        ... on News {
          id
          title
          description
          sportType
          image
          publishedAt
        }
      }
      nextToken
    }
  }
`;

export default search;
