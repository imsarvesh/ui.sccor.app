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
};

export default initialState;
export type AppState = typeof initialState;
