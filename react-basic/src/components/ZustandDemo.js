import { useEffect } from "react";
import { create } from "zustand";

// 1. 创建 store
const useStore = create((set) => {
  return {
    count: 0,
    // 同步方法
    increment: () => {
      // 2. set是用来修改数据的专门方法必须调用它来修改数据
      // 语法1：参数是函数 需要用到老数据的场景
      // 语法2：参数直接是一个对象  set({ count: 100 })
      set((state) => ({ count: state.count + 1 }));
    },
    channelList: [],
    // 异步方法
    fetchChannleList: async () => {
      const res = await fetch("http://geek.itheima.net/v1_0/channels");
      const data = await res.json();
      set({ channelList: data.data.channels });
    },
  };
});

const ZustandDemo = () => {
  // 2. 消费 store
  const { count, increment, channelList, fetchChannleList } = useStore();
  useEffect(() => {
    fetchChannleList();
  }, [fetchChannleList]);
  return (
    <div>
      <button onClick={increment}>{count}</button>
      br: <br />
      <ul>
        {(channelList || []).map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ZustandDemo;
