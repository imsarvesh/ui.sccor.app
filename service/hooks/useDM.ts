import { useDispatch, useStore } from "@/providers";
import GET_DIRECT_MESSAGES from "@/service/query/getDM";

import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import {
  MessagesPage,
  QueryGetDirectMessagesArgs,
} from "@/graphql/types/graphql";
import { ActionType } from "@/providers/StoreProvider/reducer/ActionType";

const useDirectMessages = ({ otherUserId }: { otherUserId: string }) => {
  const dispatch = useDispatch();
  const { directMessages } = useStore();

  const {
    loading: isLoading,
    data,
    error,
    refetch,
  } = useQuery<{ directMessages: MessagesPage }, QueryGetDirectMessagesArgs>(
    GET_DIRECT_MESSAGES,
    {
      variables: { otherUserId, limit: 10, nextToken: null },
    }
  );

  useEffect(() => {
    if (data) {
      const messagesPage = data.directMessages;

      dispatch({
        type: ActionType.LOAD_DMs,
        payload: {
          messagesPage,
          otherUserId,
        },
      });
    }
  }, [data]);

  return {
    messages: directMessages.get(otherUserId),
    isLoading,
    error,
  };
};

export default useDirectMessages;
