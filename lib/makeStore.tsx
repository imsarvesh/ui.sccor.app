import React, { createContext, useContext, useReducer } from "react";

export default function makeStore(reducer) {
  const dispatchContext = createContext(null);
  const storeContext = createContext(null);

  const StoreProvider = ({ children, initialState }: any) => {
    const [store, dispatch] = useReducer(reducer, {
      ...initialState,
    });

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  };

  const useDispatch = () => useContext(dispatchContext);

  const useStore = () => useContext(storeContext);

  return [StoreProvider, useDispatch, useStore];
}
