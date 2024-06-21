import { ArticleRes, getArticleList } from "@/apis/list";
import { List, Image } from "antd-mobile";
import { useEffect, useState } from "react";

type Props = {
  channelId: string;
};
const HomeList = (props: Props) => {
  console.log("HomeList rendering");
  const { channelId } = props;
  const [articlesList, setArticlesList] = useState<ArticleRes>({
    results: [],
    pre_timestamp: "",
  });

  // 跟 UI 的请求需要放在组件内部
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getArticleList({
          channel_id: channelId,
          timestamp: "" + new Date().getTime(),
        });
        setArticlesList({
          results: res.data.data.results,
          pre_timestamp: res.data.data.pre_timestamp,
        });
      } catch (error) {
        throw new Error("获取文章列表失败");
      }
    };
    fetchData();
  }, [channelId]);
  return (
    <List>
      {articlesList.results.map((article) => {
        return (
          <List.Item
            key={article.art_id}
            prefix={
              <Image
                src={article.cover.images?.[0]}
                alt={article.title}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={article.pubdate}
          >
            {article.title}
          </List.Item>
        );
      })}
    </List>
  );
};

export default HomeList;
