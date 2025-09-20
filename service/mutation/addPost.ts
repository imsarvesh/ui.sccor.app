import { gql } from "@apollo/client";

const addPost = gql`
  mutation post($text: String!, $media: [String]) {
    post(text: $text, media: $media) {
      id
      createdAt
      id
      liked
      likes
      text
      profile {
        id
        image
        name
        username
      }
      media {
        id
        fileUrl
      }
    }
  }
`;

export default addPost;
