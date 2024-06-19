import { Outlet } from "react-router-dom";
import BottomTab from "./BottomTab";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBillList } from "@/store/modules/billStore";
import "./index.scss";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);

  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <BottomTab />
      </div>
    </div>
  );
};

export default Layout;
