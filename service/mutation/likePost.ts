import { gql } from "@apollo/client";

const likePost = gql`
  mutation like($postId: ID!) {
    post: like(postId: $postId) {
      id
      liked
      likes
    }
  }
`;

export default likePost;
