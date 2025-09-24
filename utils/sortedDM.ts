import { Message } from "@/graphql/types/graphql";

const sortedDM = (messages: Message[]) => {
  const ids = [
    ...Array.from(new Set(messages?.map((message) => message.id))),
  ].sort();

  const messageMap = messages.reduce((acc, message: Message) => {
    acc.set(message.id, message);
    return acc;
  }, new Map());

  return ids.map((id) => messageMap.get(id));
};

export default sortedDM;
