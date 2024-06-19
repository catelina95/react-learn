import { createBrowserRouter } from "react-router-dom";
import Layout from "../page/Layout";
import Dashboard from "../page/Dashboard";
import About from "../page/About";
import NotFound from "../page/NotFound";
import Login from "../page/Login";
import Article from "../page/Article";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/article/:",
    element: <Article />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
