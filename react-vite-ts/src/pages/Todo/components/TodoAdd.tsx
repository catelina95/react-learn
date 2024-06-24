import { useState } from "react";

type TodoAddProps = (text: string) => void;
const TodoAdd = ({ onAdd }: { onAdd: TodoAddProps }) => {
  const [todo, setTodo] = useState("");

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (todo.trim() === "") return;
    onAdd(todo.trim());
    setTodo("");
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={handleAdd}
      />
    </header>
  );
};

export default TodoAdd;
