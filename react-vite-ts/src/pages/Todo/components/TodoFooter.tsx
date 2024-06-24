import { FC } from "react";
import { TodoItem } from "../types";

interface TodoFooterProps {
  unDoneList: TodoItem[];
}
const TodoFooter: FC<TodoFooterProps> = (props) => {
  const { unDoneList } = props;
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{unDoneList.length}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a className="selected" href="#/">
            All
          </a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default TodoFooter;
