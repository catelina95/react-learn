// 跟文章相关的请求
import { http } from "@/util";

// 文章发布频道
export const api_articleChannel = () => {
  return http({
    url: "/channels",
    method: "GET",
  });
};

// 新增文章
export const api_articleAdd = (data) => {
  return http({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
};

// 更新文章
export const api_articleUpdate = (target) => {
  return http({
    url: `/mp/articles/${target.id}?draft=false`,
    method: "PUT",
    data: target,
  });
};

// 获取文章列表
export const api_getArticleList = (params) => {
  return http({
    url: "/mp/articles",
    method: "GET",
    params,
  });
};

// 删除文章
export const api_deleteArticle = (target) => {
  return http({
    url: `/mp/articles/${target}`,
    method: "DELETE",
  });
};

// 获取文章详情
export const api_getArticleDetail = (target) => {
  return http({
    url: `/mp/articles/${target}`,
    method: "GET",
  });
};
