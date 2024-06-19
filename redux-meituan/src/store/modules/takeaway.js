import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
  name: "foods",
  initialState: {
    foodsList: [], // 商品列表
    activeIndex: 0, // 菜单激活索引
    cartList: [], // 购物车列表
  },
  reducers: {
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
    addCart(state, action) {
      // 判断购物车是否已经有该商品
      const item = state.cartList.find((item) => item.id === action.payload.id);
      if (item) {
        item.count++;
      } else {
        // push 能够触发视图更新？
        state.cartList.push({ ...action.payload, count: 1 });
      }
    },
    // 清空购物车
    clearCart(state) {
      state.cartList = [];
    },
    // 减少购物车商品
    deleteCart(state, action) {
      const item = state.cartList.find((item) => item.id === action.payload.id);
      if (item.count > 1) {
        item.count--;
      } else {
        state.cartList = state.cartList.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const {
  setFoodsList,
  changeActiveIndex,
  addCart,
  clearCart,
  deleteCart,
} = foodsStore.actions;

// 异步
export const fetchFoodsList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3004/takeaway");
    dispatch(setFoodsList(res.data));
  };
};

export default foodsStore.reducer;
