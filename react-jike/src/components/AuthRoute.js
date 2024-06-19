import { getToken } from "@/util";
import { Navigate } from "react-router-dom";

// 使用 Token 做路由权限控制
export const AuthRoute = ({ children }) => {
  const token = getToken();
  if (token) {
    return children;
  } else {
    // 重定向组件
    return <Navigate to={"/login"} replace />;
  }
};
