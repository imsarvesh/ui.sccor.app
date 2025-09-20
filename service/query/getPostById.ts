import { gql } from "@apollo/client";

const getPostById = gql`
  query getPostById($postId: String!) {
    post: getPostById(postId: $postId) {
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
`;

export default getPostById;
