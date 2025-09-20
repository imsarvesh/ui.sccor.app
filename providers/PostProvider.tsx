import React, { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_POST":
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error("Unknown action!", action);
  }
};

const postContext = createContext(null);
const dispatchContext = createContext(null);

export const PostProvider = ({ children, initialState = {} }) => {
  const [post, dispatch] = useReducer(reducer, initialState);

  return (
    <dispatchContext.Provider value={dispatch}>
      <postContext.Provider value={post}>{children}</postContext.Provider>
    </dispatchContext.Provider>
  );
};

export function useStore() {
  return React.useContext(postContext);
}

export function useDispatch() {
  return React.useContext(dispatchContext);
}
