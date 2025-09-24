import { gql } from "@apollo/client";

const getDMs = gql`
  query getDirectMessages($otherUserId: ID!, $limit: Int!, $nextToken: String) {
    directMessages: getDirectMessages(
      otherUserId: $otherUserId
      limit: $limit
      nextToken: $nextToken
    ) {
      nextToken
      messages {
        id
        message
        createdAt
        from {
          id
          name
          username
          image
        }
      }
    }
  }
`;

export default getDMs;
