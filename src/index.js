import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  from
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const container = document.getElementById("app");
const root = createRoot(container);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions.code === "UNAUTHENTICATED") {
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: "https://staging.api-client.common-ground.io/graphql"
});
const authLink = setContext((_, { headers = {} }) => {
  const apiKey = "xtX3lsFTyV5x7YDQcOaT48XvFnSJhbHzaIP8wsWn";
  headers["commonground-origin"] = "dizonord.fr";
  headers["x-api-key"] = apiKey;
  return { headers };
});

const cache = new InMemoryCache({
  typePolicies: {}
});

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: cache
});

root.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);
