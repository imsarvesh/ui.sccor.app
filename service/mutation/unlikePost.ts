import { gql } from "@apollo/client";

const unlikePost = gql`
  mutation unlikePost($postId: ID!) {
    post: unlike(postId: $postId) {
      id
      liked
      likes
    }
  }
`;

export default unlikePost;
