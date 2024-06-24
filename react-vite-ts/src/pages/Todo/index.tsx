import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";
import "./styles/index.css";
import { useMemo, useState } from "react";
import type { TodoItem } from "./types";

const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      text: "吃饭",
      done: true,
    },
    {
      id: 2,
      text: "睡觉",
      done: false,
    },
    {
      id: 3,
      text: "打豆豆",
      done: false,
    },
  ]);
  const handleAdd = (text: string) => {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text,
        done: false,
      },
    ]);
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done,
          };
        }
        return item;
      })
    );
  };

  const unDoneList = useMemo(() => todos.filter((item) => !item.done), [todos]);
  return (
    <section className="todoapp">
      {/* 添加任务 */}
      <TodoAdd onAdd={handleAdd} />

      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {/* 列表组件 */}
        <TodoList list={todos} onSetDone={handleDone} />
      </section>

      {/* footer 组件 */}
      <TodoFooter unDoneList={unDoneList} />
    </section>
  );
};

export default Todo;
