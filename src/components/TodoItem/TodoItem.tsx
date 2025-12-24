import "./TodoItem.css";

export interface TodoItemType {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: TodoItemType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={`todo-item-text ${todo.completed ? "completed" : ""}`}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
