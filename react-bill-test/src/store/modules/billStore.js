import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    saveBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

export const { setBillList, saveBill } = billStore.actions;

// 异步请求：获取账单列表
export const fetchBillList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3004/ka");
    dispatch(setBillList(res.data));
  };
};

// 异步请求：保存单个账单
export const saveBillToServer = (bill) => {
  return async (dispatch) => {
    await axios.post("http://localhost:3004/ka", bill);
    dispatch(saveBill(bill));
  };
};

export default billStore.reducer;
