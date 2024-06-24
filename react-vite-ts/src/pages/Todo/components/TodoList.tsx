import type { TodoItem } from "../types";

type FuncSetDone = (id: number) => void;

const TodoList = ({
  list,
  onSetDone,
}: {
  list: TodoItem[];
  onSetDone: FuncSetDone;
}) => {
  console.log(list);
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
