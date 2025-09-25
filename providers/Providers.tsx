import { ReactNode } from "react";

// import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StoreProvider } from "../providers/StoreProvider/useStore";
import ApolloProvider from "./ApolloProvider";
import initialState from "./StoreProvider/initialState";
import { Slot } from "expo-router";
import AuthProvider from "./AuthProvider";

type ProviderPropType = {
  children: ReactNode;
  userData?: {
    me?: JSON | null;
    session?: any;
    isLoggedIn?: boolean;
  };
};

const Providers = ({ children, userData }: ProviderPropType) => {
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
