import { useEffect, useState } from "react";
import axios from "axios";

const useGetList = () => {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    const getCommentList = async () => {
      const res = await axios.get("http://localhost:3004/list");
      setCommentList(res.data);
    };

    getCommentList();
  }, []);
  return [commentList, setCommentList];
};

export { useGetList };
