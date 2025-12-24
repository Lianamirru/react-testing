import "./TodoList.css";
import TodoItem, { type TodoItemType } from "../TodoItem/TodoItem";

interface TodoListProps {
  todos: TodoItemType[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="empty-message" data-testid="empty-message">
        No todos yet
      </p>
    );
  }

  return (
    <ul className="todo-list" data-testid="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
