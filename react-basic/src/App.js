import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { decrement, incrementByAmount } from "./store/modules/counterStore";
import { useEffect } from "react";
import { fetchChannleList } from "./store/modules/channelStore";
import Fib from "./components/Fib";
import MemoComp from "./components/MemoComp";

function App() {
  console.log("Rendering App");
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const { channelList } = useSelector((state) => state.channel);
  useEffect(() => {
    dispatch(fetchChannleList());
  }, [dispatch]);
  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(incrementByAmount(10))}>Add 10</button>
      <button onClick={() => dispatch(incrementByAmount(20))}>Add 20</button>
      <br />
      <ul>
        {(channelList || []).map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
      <Fib />
      {/* MemoComp 静态页面，父组件的重新渲染不应该触发 MemoComp 组件的重新渲染 */}
      <MemoComp />
    </div>
  );
}

export default App;
