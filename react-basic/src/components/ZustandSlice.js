import { useEffect } from "react";
import { create } from "zustand";

// 1. 创建 counter 相关的切片
const createCounterSlice = (set) => {
  return {
    count: 0,
    increment: () => {
      set((state) => ({ count: state.count + 1 }));
    },
  };
};

// 2. 创建 channel 相关的切片
const createChannelSlice = (set) => {
  return {
    channelList: [],
    fetchChannelList: async () => {
      const res = await fetch("http://geek.itheima.net/v1_0/channels");
      const data = await res.json();
      set({ channelList: data.data.channels });
    },
  };
};

// 组合切片
const useStore = create((...a) => ({
  ...createCounterSlice(...a),
  ...createChannelSlice(...a),
}));

const ZustandSlice = () => {
  const { count, increment, channelList, fetchChannelList } = useStore();
  useEffect(() => {
    fetchChannelList();
  }, [fetchChannelList]);
  return (
    <>
      <button onClick={increment}>{count}</button>
      br: <br />
      <ul>
        {(channelList || []).map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ZustandSlice;
