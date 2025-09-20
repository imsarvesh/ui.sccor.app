import { createContext, Dispatch, useContext, useReducer } from "react";
import { AppState } from "./initialState";
import reducer from "./reducer/index";

const storeContext = createContext<AppState>(null);
const dispatchContext =
  createContext<Dispatch<{ type: string; payload?: any }>>(null);

export const StoreProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: any;
}) => {
  const [store, dispatch] = useReducer(reducer, {
    ...initialData,
  });

  return (
    <dispatchContext.Provider value={dispatch}>
      <storeContext.Provider value={store}>{children}</storeContext.Provider>
    </dispatchContext.Provider>
  );
};

export function useStore() {
  return useContext(storeContext);
}

export function useDispatch() {
  return useContext(dispatchContext);
}
