import { MessagesPage } from "@/graphql/types/graphql";

import getSortedConversations from "@/utils/getSortedConversations";
import { ActionType } from "../ActionType";
import sortedDM from "@/utils/sortedDM";

const messgae = (state) => ({
  [ActionType.LOAD_CONVERSATIONS]: (action) => {
    const { conversations, nextToken } = action.payload;

    const sortedConversations = getSortedConversations(
      state.listConversations.conversations,
      conversations
    );

    return {
      ...state,
      listConversations: {
        nextToken,
        conversations: sortedConversations,
      },
    };
  },
  [ActionType.LOAD_DMs]: (action) => {
    const { otherUserId, messagesPage } = action.payload;
    const { messages, nextToken } = messagesPage;

    const directMessages = state.directMessages;

    const DMs: MessagesPage = directMessages.get(otherUserId) || {
      nextToken,
      messages: messages || [],
    };

    DMs.nextToken = nextToken;
    DMs.messages = sortedDM([...DMs.messages, ...messages]);

    directMessages.set(otherUserId, DMs);

    return {
      ...state,
      directMessages,
    };
  },
});

export default messgae;
