import React from "react";
import { render, screen } from "@testing-library/react";
import { HelloWorld } from "./HelloWorld";

describe("HelloWorld", () => {
  it("shows hello world", () => {
    render(<HelloWorld />);
    expect(screen.getByText(/Hello world!/)).toBeInTheDocument();
  });
});
