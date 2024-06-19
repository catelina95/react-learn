import { getToken, setToken as _setToken, removeToken } from "@/util";
import { createSlice } from "@reduxjs/toolkit";
import { api_Login, api_GetUserInfo } from "@/api/userApi";
const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "", // 初始化时从本地存储中取 token
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload; // redux 存一份
      _setToken(action.payload); // 本地存一份
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

export const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

export const loginApi = (loginForm) => {
  return async (dispatch) => {
    const res = await api_Login(loginForm);
    console.log(res);
    dispatch(setToken(res.data.token));
  };
};

export const getUserInfoApi = () => {
  return async (dispatch) => {
    const res = await api_GetUserInfo();
    dispatch(setUserInfo(res.data));
  };
};

export default userStore.reducer;
