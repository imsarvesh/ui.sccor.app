import { useMutation } from "@apollo/client/react";
import SEND_DM from "../mutation/sendDM";
import {
  MessagesPage,
  MutationSendDirectMessageArgs,
} from "@/graphql/types/graphql";
import GET_DIRECT_MESSAGES from "../query/getDM";

const useSendDM = () => {
  const [sendDM, { loading: isLoading }] = useMutation<
    { sendDM: MessagesPage },
    MutationSendDirectMessageArgs
  >(SEND_DM, {
    refetchQueries: [GET_DIRECT_MESSAGES],
  });

  const handleSendDM = (otherUserId: string, message: string) => {
    sendDM({ variables: { otherUserId, message } });
  };

  return {
    sendDM: handleSendDM,
    isLoading,
  };
};

export default useSendDM;
