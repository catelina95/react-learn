import { FC, useState } from "react";

interface TodoAddProps {
  onAdd: (text: string) => void;
}

const TodoAdd: FC<TodoAddProps> = (props) => {
  const { onAdd } = props;
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
