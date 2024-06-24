import { FC } from "react";
import type { Func, TodoItem } from "../types";

interface ITodoListProps {
  list: TodoItem[];
  onSetDone: Func<number>;
}

const TodoList: FC<ITodoListProps> = (props) => {
  const { list, onSetDone } = props;
  return (
    <ul className="todo-list">
      {list.map((item) => (
        <li key={item.id} className={item.done ? "completed" : ""}>
          <div className="view" onClick={() => onSetDone(item.id)}>
            <input type="checkbox" className="toggle" checked={item.done} />
            <label>{item.text}</label>
            <button className="destory"></button>
          </div>
          <input className="edit" defaultValue="create a TodoMVC template" />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
