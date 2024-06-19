import { Link, Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <h1>我是布局</h1>
      <div>
        <Link to="/">面板</Link>
        <Link to="/about">关于</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
