import { useState } from "react";
import "./Todo.css";
import TodoInput from "../TodoInput/TodoInput";
import TodoList from "../TodoList/TodoList";
import type { TodoItemType } from "../TodoItem/TodoItem";

function Todo() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: TodoItemType = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <TodoInput value={inputValue} onChange={setInputValue} onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default Todo;
