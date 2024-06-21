import { http } from "@/utils";
import { ResType } from "./shared";

// 定义具体的接口返回类型
type ChannelItem = {
    id: number;
    name: string;
}

type ChannelRes = {
    channels: ChannelItem[]
}

// 定义接口请求channel
export const getChannelList = () => {
    return http.request<ResType<ChannelRes>>({
        url: '/channels',
        method: 'GET'
    })
}