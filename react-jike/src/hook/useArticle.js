import { useState, useEffect } from "react";
import { api_articleChannel } from "@/api/articleApi";

export const useArticleChannel = () => {
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await api_articleChannel();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);

  return { channelList };
};
