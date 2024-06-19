import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      我是登录
      {/* 声明式导航 */}
      <Link to="/article">跳转到文章页</Link>
      {/* 编程式导航 search 参数 */}
      <button onClick={() => navigate("/article?id=1001&name=jack")}>
        跳转到文章页
      </button>
      {/* 编程式导航 path 参数 */}
      <button onClick={() => navigate("/article/new?id=1001&name=jack")}>
        跳转到文章页
      </button>
    </div>
  );
};

export default Login;
