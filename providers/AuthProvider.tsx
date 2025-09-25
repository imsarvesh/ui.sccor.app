import { Slot } from "expo-router";
import ApolloProvider from "./ApolloProvider";
import { useStore } from "./StoreProvider/useStore";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useStore();
  return (
    <ApolloProvider token={session?.accessToken}>{children}</ApolloProvider>
  );
};

export default AuthProvider;
