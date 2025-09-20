import { gql } from "@apollo/client";

const reply = gql`
  mutation reply($postId: ID!, $text: String!) {
    reply(postId: $postId, text: $text) {
      createdAt
      id
      liked
      likes
      profile {
        id
        image
        name
        username
      }
      text
    }
  }
`;

export default reply;
