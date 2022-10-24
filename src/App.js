import "./index.scss";
import Item from "./item";
import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing, { rootLoader } from "./routes/landing";

const GET_CONFIG = gql(`
query($domain: String) {
  config(domain: $domain) {
    id
    modules {
      data 
    }
    domain
  }
}
`);

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    loader: null,
    children: []
  }
]);
export default function App() {
  const { data: configData, error } = useQuery(GET_CONFIG, {
    variables: { domain: "dizonord.fr" }
  });

  console.log(configData, error);

  if (!configData) return <p>Loading</p>;
  return (
    <div>
      <ul>
        <li>Router</li>
        <li>Store (PullStateSTore store.js)</li>
        <li>Player audio</li>
        <li>Graphql mutation (add to basket)</li>
      </ul>
      <RouterProvider router={Router} />
      {configData.config.id} {configData.config.domain}
      <Item item={{ title: "A new title" }} />
    </div>
  );
}

export { Router };
