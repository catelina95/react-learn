import "./index.css";
import { Tabs } from "antd-mobile";
import { useTabs } from "./useHome";
import HomeList from "./components/HomeList";

const Home = () => {
  console.log("Home rendering..");
  const { channelList } = useTabs();
  return (
    <div className="tabContainer">
      <Tabs defaultActiveKey={"0"}>
        {channelList.map((item) => (
          <Tabs.Tab title={item.name} key={item.id}>
            <HomeList channelId={"" + item.id} />
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Home;
