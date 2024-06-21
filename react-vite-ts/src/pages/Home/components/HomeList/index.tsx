import { ArticleRes, getArticleList } from "@/apis/list";
import { List, Image, InfiniteScroll } from "antd-mobile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  channelId: string;
};
const HomeList = (props: Props) => {
  console.log("HomeList rendering");
  const { channelId } = props;
  const [articlesList, setArticlesList] = useState<ArticleRes>({
    results: [],
    pre_timestamp: "" + new Date().getTime(),
  });

  const [hasMore, setHasMore] = useState(true);
  const loadMore = async () => {
    console.log("loadMore");
    try {
      const res = await getArticleList({
        channel_id: channelId,
        timestamp: articlesList.pre_timestamp,
      });
      // 拼接数据
      const { results, pre_timestamp } = res.data.data;
      setArticlesList({
        results: [...articlesList.results, ...results],
        pre_timestamp,
      });
      // 停止监听
      if (results.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      throw new Error("获取文章列表失败");
    }
  };

  const navigate = useNavigate();
  const gotoDetail = (id: string) => {
    navigate(`/detail?id=${id}`);
  };

  // 跟 UI 的请求需要放在组件内部
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getArticleList({
          channel_id: channelId,
          timestamp: "" + new Date().getTime(),
        });
        const { results, pre_timestamp } = res.data.data;
        setArticlesList({ results, pre_timestamp });
      } catch (error) {
        throw new Error("获取文章列表失败");
      }
    };
    fetchData();
  }, [channelId]);
  return (
    <>
      <List>
        {articlesList.results.map((article) => (
          <List.Item
            onClick={() => gotoDetail(article.art_id)}
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
        ))}
      </List>
      <InfiniteScroll threshold={10} loadMore={loadMore} hasMore={hasMore} />
    </>
  );
};

export default HomeList;
