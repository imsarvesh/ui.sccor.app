import { gql } from "@apollo/client";

const getMyTimeline = gql`
  query getMyTimeline($limit: Int, $nextToken: String) {
    timeline: getMyTimeline(limit: $limit, nextToken: $nextToken) {
      nextToken
      posts {
        __typename
        id
        profile {
          id
          name
          username
          image
        }
        createdAt
        ... on Post {
          text
          liked
          likes
        }
      }
    }
  }
`;

export default getMyTimeline;
