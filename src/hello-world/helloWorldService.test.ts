import { getHelloWorldMessage } from "./helloWorldService";
import axios from "axios";
import { wait } from "@testing-library/react";

jest.mock("axios");

beforeAll(() => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: { msg: "Hello Mocked World!" },
  });
});

describe("helloWorldService", () => {
  it("calls the correct URL", async () => {
    // when
    await getHelloWorldMessage();

    // then
    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(axios.get).toHaveBeenCalledWith("/api/");
  });

  it("returns hello world message", async () => {
    // when
    const message = await getHelloWorldMessage();

    // then
    expect(message).toEqual("Hello Mocked World!");
  });
});
