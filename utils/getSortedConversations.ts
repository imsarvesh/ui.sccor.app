import { Conversation } from "@/graphql/types/graphql";
import getTimestamp from "./getTimestamp";

export type ConversationMap = Map<string, Conversation>;

const getSortedConversations = (
  initialConversationsMap: ConversationMap,
  conversations: Conversation[] = []
) => {
  const unsortedConversations = conversations?.reduce(
    (acc: Map<string, Conversation>, conversation: Conversation) => {
      acc.set(conversation.id, conversation);
      return acc;
    },
    initialConversationsMap
  );

  const sortedConversations: ConversationMap = new Map(
    [...unsortedConversations.entries()].sort(
      (a: [string, Conversation], b: [string, Conversation]) => {
        const [, aConversation] = a;
        const [, bConversation] = b;

        const aLastUpdatAt = getTimestamp(+aConversation.updateAt);
        const bLastUpdatAt = getTimestamp(+bConversation.updateAt);

        return getTimestamp(aLastUpdatAt) < getTimestamp(bLastUpdatAt) ? 1 : -1;
      }
    )
  );

  return sortedConversations;
};

export default getSortedConversations;
