import { gql } from "@apollo/client";

const sendDirectMessage = gql`
  mutation sendDirectMessage($otherUserId: ID!, $message: String!) {
    sendDirectMessage(otherUserId: $otherUserId, message: $message) {
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
`;

export default sendDirectMessage;
