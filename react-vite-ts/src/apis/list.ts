import { http } from "@/utils";
import { ResType } from "./shared";

// 定义具体的接口返回类型
export type ChannelItem = {
    id: number;
    name: string;
};

type ChannelRes = {
    channels: ChannelItem[];
};

export type ArticleItem = {
    art_id: string;
    title: string;
    aut_id: string;
    comn_count: number;
    pubdate: string;
    aut_name: string;
    is_top: number;
    cover: {
        type: number;
        images: string[];
    };
};

export type ArticleRes = {
    results: ArticleItem[];
    pre_timestamp: string;
};

// 定义接口请求 channel 频道列表
export const getChannelList = () => {
    return http.request<ResType<ChannelRes>>({
        url: "/channels",
        method: "GET",
    });
};

// 获取文章列表
export type ArticleReqParams = {
    channel_id: string;
    timestamp: string;
};
export const getArticleList = (params: ArticleReqParams) => {
    return http.request<ResType<ArticleRes>>({
        url: "/articles",
        method: "GET",
        params,
    });
};
