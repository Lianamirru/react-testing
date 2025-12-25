import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todo from "./Todo";
import axios from "axios";

jest.mock("axios");

test("Todo snapshot renders correctly", async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: { todos: [{ todo: "first todo", id: 1, completed: false }] },
  });

  const { asFragment } = render(<Todo />);
  await screen.findByText("first todo");
  expect(asFragment()).toMatchSnapshot();
});
