import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";

describe("Todo", () => {
  test("renders todo list heading", () => {
    render(<Todo />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  test("adds a new todo when add button is clicked", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByRole("button", { name: /add/i });
    await user.type(input, "Buy groceries");
    await user.click(addButton);

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(screen.queryByText("No todos yet")).not.toBeInTheDocument();
  });

  test("adds a new todo when Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByPlaceholderText("Add a new todo");
    await user.type(input, "Write tests{Enter}");

    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  test("clears input after adding todo", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByPlaceholderText(
      "Add a new todo"
    ) as HTMLInputElement;
    const addButton = screen.getByRole("button", { name: /add/i });
    await user.type(input, "Clean room");
    await user.click(addButton);

    expect(input.value).toBe("");
  });

  test("does not add empty todos", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const addButton = screen.getByRole("button", { name: /add/i });
    await user.click(addButton);

    expect(screen.getByText("No todos yet")).toBeInTheDocument();
  });

  test("does not add todos with only whitespace", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByRole("button", { name: /add/i });
    await user.type(input, "   ");
    await user.click(addButton);

    expect(screen.getByText("No todos yet")).toBeInTheDocument();
  });

  test("deletes a todo when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByRole("button", { name: /add/i });
    await user.type(input, "Task to delete");
    await user.click(addButton);

    expect(screen.getByText("Task to delete")).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(screen.queryByText("Task to delete")).not.toBeInTheDocument();
    expect(screen.getByText("No todos yet")).toBeInTheDocument();
  });

  test("adds multiple todos", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByRole("button", { name: /add/i });
    await user.type(input, "First todo");
    await user.click(addButton);
    await user.type(input, "Second todo");
    await user.click(addButton);
    await user.type(input, "Third todo");
    await user.click(addButton);
    
    expect(screen.getByText("First todo")).toBeInTheDocument();
    expect(screen.getByText("Second todo")).toBeInTheDocument();
    expect(screen.getByText("Third todo")).toBeInTheDocument();
  });

  test("maintains other todos when deleting one", async () => {
    const user = userEvent.setup();
    render(<Todo />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByRole("button", { name: /add/i });
    await user.type(input, "Keep this");
    await user.click(addButton);
    await user.type(input, "Delete this");
    await user.click(addButton);
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[1]);

    expect(screen.getByText("Keep this")).toBeInTheDocument();
    expect(screen.queryByText("Delete this")).not.toBeInTheDocument();
  });
});
