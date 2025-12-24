import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TodoItem from "./TodoItem";

describe("TodoItem Component", () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  const mockTodo = {
    id: 1,
    text: "Test todo",
    completed: false,
  };

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  const renderItem = (todo = mockTodo) => {
    render(
      <TodoItem todo={todo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    return {
      checkbox: screen.getByRole("checkbox") as HTMLInputElement,
      deleteButton: screen.getByRole("button", { name: /delete/i }),
      text: screen.getByText(todo.text),
    };
  };

  test("renders todo item", () => {
    const { checkbox, deleteButton, text } = renderItem();

    expect(text).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("calls onToggle with todo id when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const { checkbox } = renderItem();

    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  test("checkbox is unchecked when todo is not completed", () => {
    const { checkbox } = renderItem();
    expect(checkbox.checked).toBe(false);
  });

  test("checkbox is checked when todo is completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { checkbox } = renderItem(completedTodo);
    expect(checkbox.checked).toBe(true);
  });

  test("text has no completed class when not completed", () => {
    const { text } = renderItem();
    expect(text).toHaveClass("todo-item-text");
    expect(text).not.toHaveClass("completed");
  });

  test("text has completed class when completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { text } = renderItem(completedTodo);
    expect(text).toHaveClass("todo-item-text");
    expect(text).toHaveClass("completed");
  });

  test("calls onDelete with todo id when delete button is clicked", async () => {
    const user = userEvent.setup();
    const { deleteButton } = renderItem();

    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
  });
});
