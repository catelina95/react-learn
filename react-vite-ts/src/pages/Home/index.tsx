import React from "react";
import { useEffect } from "react";
import { getChannelList } from "@/apis/list";

const Home: React.FC = () => {
  useEffect(() => {
    getChannelList();
  }, []);
  return <div>Home Page</div>;
};

export default Home;
