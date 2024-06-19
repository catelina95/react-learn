import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    // 可传参的 action
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

// 解构出 actionCreater 函数
const { increment, decrement, incrementByAmount } = counterStore.actions;

// 获取 reducer 函数
const counterReducer = counterStore.reducer;

// 以 按需导出 的方式导出 actionCreater 函数
export { increment, decrement, incrementByAmount };

// 以 默认导出 的当时导出 reducer 函数
export default counterReducer;
