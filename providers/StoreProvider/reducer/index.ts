import { AppState } from "../initialState";
import actions from "./reducerAction";

const defaultAction = () => {
  throw new Error("Unknown action!");
};

const reducerAction = (
  state: AppState,
  action: { type: string; payload: any }
) => {
  const fn = actions(state)[action.type] || defaultAction;
  return fn(action);
};

export default reducerAction;
