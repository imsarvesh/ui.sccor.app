import { gql } from "@apollo/client";

const ListConversations = gql`
  query listConversations($limit: Int!, $nextToken: String) {
    listConversations(limit: $limit, nextToken: $nextToken) {
      conversations {
        id
        lastMessage
        updateAt
        unreadCounts
        otherUser {
          id
          image
          name
          email
        }
      }
      nextToken
    }
  }
`;

export default ListConversations;
