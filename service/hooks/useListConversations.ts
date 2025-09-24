import LIST_CONVERSATIONS from "@/service/query/ListConversations";
import { useDispatch } from "@/providers";
import { useQuery } from "@apollo/client/react";
import {
  ConversationsPage,
  QueryListConversationsArgs,
} from "@/graphql/types/graphql";
import { useEffect } from "react";
import { ActionType } from "@/providers/StoreProvider/reducer/ActionType";

const useListConversations = () => {
  const dispatch = useDispatch();

  const { data, loading: isLoading } = useQuery<
    { listConversations: ConversationsPage },
    QueryListConversationsArgs
  >(LIST_CONVERSATIONS, {
    variables: { limit: 10, nextToken: null },
  });

  useEffect(() => {
    if (data) {
      const { listConversations } = data;

      dispatch({
        type: ActionType.LOAD_CONVERSATIONS,
        payload: listConversations,
      });
    }
  }, [data]);

  return {
    isLoading,
  };
};

export default useListConversations;
