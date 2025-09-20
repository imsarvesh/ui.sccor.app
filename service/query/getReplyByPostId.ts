import { gql } from "@apollo/client";

const getReplyByPostId = gql`
  query getReplyByPostId($postId: String, $limit: Int, $nextToken: String) {
    comments: getReplyByPostId(
      postId: $postId
      limit: $limit
      nextToken: $nextToken
    ) {
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

export default getReplyByPostId;
