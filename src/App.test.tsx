import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  test("renders Todo component", () => {
    render(<App />);
    const headingElement = screen.getByText(/Todo List/i);
    expect(headingElement).toBeInTheDocument();
  });
});
