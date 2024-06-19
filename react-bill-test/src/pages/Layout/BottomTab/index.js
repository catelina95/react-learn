import { TabBar } from "antd-mobile";
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

const BottomTab = () => {
  const tabs = [
    {
      key: "",
      title: "月度账单",
      icon: <BillOutline />,
    },
    {
      key: "new",
      title: "记账",
      icon: <AddCircleOutline />,
    },
    {
      key: "year",
      title: "年度账单",
      icon: <CalculatorOutline />,
    },
  ];

  const navigate = useNavigate();

  // 切换菜单路由跳转
  const switchRoute = (path) => {
    navigate(path);
  };

  return (
    <TabBar onChange={switchRoute}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default BottomTab;
