import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { decrement, incrementByAmount } from "./store/modules/counterStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchChannleList } from "./store/modules/channelStore";
import Fib from "./components/Fib";
import MemoComp from "./components/MemoComp";
import CacheFunc from "./components/CacheFunc";
import InputComponent from "./components/ForwardRefComp";

function App() {
  console.log("Rendering App");
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const { channelList } = useSelector((state) => state.channel);
  useEffect(() => {
    dispatch(fetchChannleList());
  }, [dispatch]);

  const list = useMemo(() => [1, 2, 3], []);
  const num = 100;

  const [number, setNumber] = useState(0);

  // 缓存函数，当 App 组件重新渲染时，不应该触发 CacheFunc 组件的重新渲染
  const handleCacheFuncChange = useCallback((value) => {
    console.log("CacheFunc value: ", value);
  }, []);

  const rfcompRef = useRef(null);
  const focuseInput = () => {
    // 为什么这里是 null？
    console.log(rfcompRef.current);
    // rfcompRef.current && rfcompRef.current.focus();
  };

  return (
    <div className="App">
      <button onClick={() => setNumber(number + 1)}>重新渲染 App</button>
      <br />
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
      <MemoComp num={num} list={list} />
      {/* 把函数作为 prop 传给了 子组件 */}
      <CacheFunc onChange={handleCacheFuncChange} />
      <InputComponent ref={rfcompRef} />
      button: <button onClick={focuseInput}>Focus</button>
    </div>
  );
}

export default App;
