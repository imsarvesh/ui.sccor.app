import { MessagesPage } from "@/graphql/types/graphql";

const initialState = {
  isOnline: false,
  session: null,
  me: null,
  profile: null,
  isLoggedIn: false,
  search: {
    nextToken: null,
    results: [],
  },
  timeline: {
    nextToken: null,
    posts: [],
  },
  listConversations: {
    nextToken: null,
    conversations: new Map(),
  },
  directMessages: new Map<string, MessagesPage>(),
};

export default initialState;
export type AppState = typeof initialState;
