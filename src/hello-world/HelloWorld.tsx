import React from "react";
import { useAsync } from "react-use";
import { getHelloWorldMessage } from "./helloWorldService";

export const HelloWorld = (): JSX.Element => {
  const { loading, value: message, error } = useAsync(getHelloWorldMessage, []);
  return (
    <>
      {loading ? "Loading..." : null}
      {message ? message : null}
      {error ? "Error: Failed to load 'Hello World!' from backend." : null}
    </>
  );
};
