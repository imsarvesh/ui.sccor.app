import { ReactNode } from "react";

// import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { StoreProvider } from "../providers/StoreProvider/useStore";
import AuthProvider from "./AuthProvider";
import initialState from "./StoreProvider/initialState";

type ProviderPropType = {
  children: ReactNode;
  userData?: {
    me?: JSON | null;
    session?: any;
    isLoggedIn?: boolean;
  };
};

const Providers = ({ userData }: ProviderPropType) => {
  const { me, session, isLoggedIn } = userData;
  return (
    <StoreProvider initialData={{ ...initialState, session, me, isLoggedIn }}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </StoreProvider>
  );
};

export default Providers;
