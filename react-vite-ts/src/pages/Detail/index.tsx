import { fetchDetail, type DetailRes } from "@/apis/detail";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NavBar } from "antd-mobile";
import Demo from "../Demo";

const Detail: React.FC = () => {
  const [detail, setDetail] = useState<DetailRes | null>(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get("id");

  const back = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await fetchDetail(id!);
        setDetail(res.data.data);
      } catch (error) {
        throw new Error("获取文章详情失败");
      }
    };
    getDetail();
  }, [id]);

  return (
    <>
      {detail ? (
        <div>
          <NavBar onBack={back}>{detail?.title}</NavBar>
          <div
            dangerouslySetInnerHTML={{ __html: detail?.content || "" }}
          ></div>
        </div>
      ) : (
        <div>加载中...</div>
      )}

      <Demo name={"catelina"} />
    </>
  );
};

export default Detail;
