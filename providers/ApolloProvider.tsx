import { ApolloProvider } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { memo, ReactNode } from "react";
import apolloClient from "../lib/apolloClient";

type ProviderPropType = { children: ReactNode; token: string };

function Layout({ children, token }: ProviderPropType) {
  console.log("token", token);
  const route = useRouter();
  const client = apolloClient(token, (message) => {
    if (message === "Unauthorized") route.push("/login");
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default memo(Layout);
