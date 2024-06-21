import { useState, useEffect } from "react";
import type { ArticleItem, ArticleReqParams, ChannelItem } from "@/apis/list";
import { getArticleList, getChannelList } from "@/apis/list";

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

export const useList = ({ channel_id, timestamp }: ArticleReqParams) => {
    const [articles, setArticles] = useState<ArticleItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getArticleList({ channel_id, timestamp })
                setArticles(res.data.data.results)
            } catch (error) {
                throw new Error("获取文章列表失败")
            }
        }
        fetchData()
    }, [channel_id, timestamp])

    return { articles }
}