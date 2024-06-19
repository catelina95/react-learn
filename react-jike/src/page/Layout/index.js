import { getUserInfoApi, clearUserInfo } from "@/store/modules/userStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout, Menu, Popconfirm } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Sider } = Layout;

const GeekLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 反向高亮
  const location = useLocation();
  const selectedKeys = location.pathname;

  const { userInfo } = useSelector((state) => state.user);

  const items = [
    {
      icon: <HomeOutlined />,
      label: "数据概览",
      key: "/",
    },
    {
      icon: <DiffOutlined />,
      label: "文章管理",
      key: "/article",
    },
    {
      icon: <EditOutlined />,
      label: "发布文章",
      key: "/publish",
    },
  ];

  // 菜单点击跳转路由
  const handleMenu = (route) => {
    navigate(route.key);
  };

  // 登出
  const handleLogout = () => {
    dispatch(clearUserInfo());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUserInfoApi());
  }, [dispatch]);
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={handleLogout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={selectedKeys}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
            onClick={handleMenu}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
