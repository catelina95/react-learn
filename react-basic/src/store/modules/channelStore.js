import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
  name: "channel",
  initialState: {
    channelList: [],
  },
  // 这里写的都是同步修改方法
  reducers: {
    setChannels: (state, action) => {
      state.channelList = action.payload;
    },
    addChannel: (state, action) => {
      state.channelList.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channelList = state.channelList.filter(
        (channel) => channel.id !== action.payload
      );
    },
  },
});

export const { setChannels, addChannel, removeChannel } = channelStore.actions;

// 异步请求
const url = "http://geek.itheima.net/v1_0/channels";
const fetchChannleList = () => {
  return async (dispatch) => {
    const res = await axios.get(url);
    dispatch(setChannels(res.data.data.channels));
  };
};

export { fetchChannleList };

export default channelStore.reducer;
