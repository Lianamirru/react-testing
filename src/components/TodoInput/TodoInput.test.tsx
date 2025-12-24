import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TodoInput from "./TodoInput";

describe("TodoInput Component", () => {
  const mockOnChange = jest.fn();
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getElements = () => ({
    input: screen.getByPlaceholderText("Add a new todo") as HTMLInputElement,
    addButton: screen.getByRole("button", { name: /add/i }),
  });

  test("renders input and add button", () => {
    render(<TodoInput value="" onChange={mockOnChange} onAdd={mockOnAdd} />);

    const { input, addButton } = getElements();
    expect(input).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("displays the value prop correctly", () => {
    render(
      <TodoInput value="Test todo" onChange={mockOnChange} onAdd={mockOnAdd} />
    );

    const { input } = getElements();
    expect(input).toHaveValue("Test todo");
  });

  test("calls onChange when typing", async () => {
    const user = userEvent.setup();
    render(<TodoInput value="" onChange={mockOnChange} onAdd={mockOnAdd} />);

    const { input } = getElements();
    await user.type(input, "New todo");

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("calls onAdd when button is clicked", async () => {
    const user = userEvent.setup();
    render(<TodoInput value="" onChange={mockOnChange} onAdd={mockOnAdd} />);

    const { addButton } = getElements();
    await user.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  test("calls onAdd when Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(<TodoInput value="" onChange={mockOnChange} onAdd={mockOnAdd} />);

    const { input } = getElements();
    await user.type(input, "{Enter}");

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });
});
