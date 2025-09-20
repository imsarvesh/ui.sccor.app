import { gql } from "@apollo/client";

const getTimeline = gql`
  query getTimeline($limit: Int, $nextToken: String) {
    timeline: getTimeline(limit: $limit, nextToken: $nextToken) {
      nextToken
      posts {
        __typename
        id
        type
        likes
        liked
        repliesCount
        data {
          ... on News {
            image
            __typename
            id
            title
            description
            source
            sourceUrl
            sourceIcon
            publishedAt
            link
          }
        }
      }
    }
  }
`;

export default getTimeline;
