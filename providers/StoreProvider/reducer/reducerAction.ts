import { AppState } from "../initialState";
import auth from "./actions/auth";
import message from "./actions/message";
import profile from "./actions/profile";
import search from "./actions/search";
import timeline from "./actions/timeline";

const reducerAction = (state: AppState) => {
  return {
    // Auth
    ...auth(state),

    // Profile
    ...profile(state),

    // Search
    ...search(state),

    // Timeline
    ...timeline(state),

    // Message
    ...message(state),
  };
};

export default reducerAction;
