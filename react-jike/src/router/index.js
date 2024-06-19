import { createBrowserRouter } from "react-router-dom";
import Layout from "@/page/Layout";
import Login from "@/page/Login";
import { AuthRoute } from "@/components/AuthRoute";
import { lazy, Suspense } from "react";

// 1. 使用 lazy 函数包裹组件，实现组件的懒加载
const Home = lazy(() => import("@/page/Home"));
const Article = lazy(() => import("@/page/Article"));
const Publish = lazy(() => import("@/page/Publish"));
// 2. 使用 Suspense 组件包裹 lazy 函数，实现加载中的展示

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={"加载中"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "article",
        element: (
          <Suspense fallback={"加载中"}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={"加载中"}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
