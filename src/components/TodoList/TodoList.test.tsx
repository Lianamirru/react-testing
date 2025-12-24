import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  test("renders empty message when todos array is empty", () => {
    render(
      <TodoList todos={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    expect(screen.getByText("No todos yet")).toBeInTheDocument();
  });

  test("does not render empty message when todos exist", () => {
    const todos = [{ id: 1, text: "First todo", completed: false }];
    render(
      <TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    expect(screen.queryByText("No todos yet")).not.toBeInTheDocument();
  });

  test("does not render todo list when empty", () => {
    render(
      <TodoList todos={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("renders all todos", () => {
    const todos = [
      { id: 1, text: "First todo", completed: false },
      { id: 2, text: "Second todo", completed: true },
      { id: 3, text: "Third todo", completed: false },
    ];
    render(
      <TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    expect(screen.getByText("First todo")).toBeInTheDocument();
    expect(screen.getByText("Second todo")).toBeInTheDocument();
    expect(screen.getByText("Third todo")).toBeInTheDocument();
  });

  test("calls onToggle when todo is toggled", async () => {
    const user = userEvent.setup();
    const todos = [{ id: 1, text: "Test todo", completed: false }];
    render(
      <TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  test("calls onDelete when todo is deleted", async () => {
    const user = userEvent.setup();
    const todos = [{ id: 1, text: "Test todo", completed: false }];
    render(
      <TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test("renders correct number of todos", () => {
    const todos = [
      { id: 1, text: "First", completed: false },
      { id: 2, text: "Second", completed: false },
      { id: 3, text: "Third", completed: false },
      { id: 4, text: "Fourth", completed: false },
    ];
    render(
      <TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems).toHaveLength(4);
  });
});
