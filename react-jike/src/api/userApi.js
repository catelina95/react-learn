// 用户相关请求函数
import { http } from "@/util";

// 登录
export const api_Login = (loginForm) => {
  return http({
    url: "/authorizations",
    method: "POST",
    data: loginForm,
  });
};

// 用户信息
export const api_GetUserInfo = () => {
  return http({
    url: "/user/profile",
    method: "GET",
  });
};
