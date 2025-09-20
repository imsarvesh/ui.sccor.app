import config from "@/constants/configs";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client/link/http";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const API = process.env.EXPO_PUBLIC_API;
const WS = process.env.EXPO_PUBLIC_WS;

const client = (token?: string, onError?: (message: string) => void) => {
  const authorization = token ? `Bearer ${token}` : "";

  const authLink = new SetContextLink((prevContext) => {
    return {
      headers: {
        ...prevContext.headers,
        authorization,
      },
    };
  });
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${WS}/graphql`,
      connectionParams: {
        reconnect: true,
        authorization,
      },
    })
  );

  const httpLink = new HttpLink({
    uri: `${API}/graphql`,
  });

  const splitLink = ApolloLink.split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const link = ApolloLink.from([authLink, splitLink]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      typePolicies: {
        OtherProfile: {
          fields: {
            defaultImage: {
              read() {
                return config.defaultAvatar;
              },
            },
          },
        },
        MyProfile: {
          fields: {
            defaultImage: {
              read() {
                return config.defaultAvatar;
              },
            },
          },
        },
      },
    }),
  });
};

export default client;
