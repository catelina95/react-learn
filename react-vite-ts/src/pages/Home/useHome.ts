import { useState, useEffect } from "react";
import type { ChannelItem } from "@/apis/list";
import { getChannelList } from "@/apis/list";

// hooks 放置一些在这个组件内部公用的
export const useTabs = () => {
    const [channelList, setChannelList] = useState<ChannelItem[]>([]);
    useEffect(() => {
        // 定义一个内部的异步函数
        const fetchData = async () => {
            try {
                const res = await getChannelList();
                setChannelList(res.data.data.channels);
            } catch (error) {
                throw new Error("获取频道列表失败");
            }
        };

        fetchData(); // 调用内部异步函数
    }, []);

    return { channelList }
}