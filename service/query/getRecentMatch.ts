import { gql } from "@apollo/client";

const getRecentMatch = gql`
  query getRecentMatch {
    recentMatch: getRecentMatch {
      id
      likes
      data {
        ... on Match {
          id
          name
          sportType
          venue
          source
          startAt
          sourceId
          status
          isLive
          completed
          sourceUrl
          tournament {
            id
            name
          }
        }
      }
    }
  }
`;

export default getRecentMatch;
