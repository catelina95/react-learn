import { useParams, useSearchParams } from "react-router-dom";
const Article = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const type = params.type;
  return (
    <div>
      我是文章 - {id} - {name} - {type}
    </div>
  );
};

export default Article;
