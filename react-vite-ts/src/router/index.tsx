import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// 使用 lazy 函数懒加载组件
const Home = lazy(() => import("@/pages/Home"));
const Detail = lazy(() => import("@/pages/Detail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={"加载中"}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/detail",
    element: (
      <Suspense fallback={"加载中"}>
        <Detail />
      </Suspense>
    ),
  },
]);

export default router;
