import "./index.css";
import { Tabs, List } from "antd-mobile";
import { useTabs, useList } from "./useHome";
import { useState } from "react";

const Home = () => {
  const { channelList } = useTabs();
  const [activeKey, setActiveKey] = useState("0");
  const { articles } = useList({
    channel_id: activeKey,
    timestamp: "" + new Date().getTime(),
  });
  console.log("articles", articles);
  const handleActiveKey = (key: string) => {
    setActiveKey(key);
  };
  return (
    <div className="tabContainer">
      {/* tab区域 */}
      <Tabs activeKey={activeKey} onChange={handleActiveKey}>
        {channelList.map((item) => {
          return <Tabs.Tab title={item.name} key={item.id}></Tabs.Tab>;
        })}
      </Tabs>
    </div>
  );
};

export default Home;
