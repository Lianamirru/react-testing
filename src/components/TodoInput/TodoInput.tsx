import "./TodoInput.css";

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="todo-input-container">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Add a new todo"
      />
      <button onClick={onAdd}>Add</button>
    </div>
  );
}

export default TodoInput;
