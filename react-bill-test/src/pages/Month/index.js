import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DayBill from "./components/DayBill";

const Month = () => {
  const [dateVis, setDateVis] = useState(false);
  const [curDate, setcurDate] = useState(() =>
    dayjs(new Date()).format("YYYY-MM")
  );

  const [curMonthBill, setcurMonthBill] = useState([]);
  const { billList } = useSelector((state) => state.bill);

  // 类似 Vue 的计算属性
  const monthBill = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  // 确认时间选择
  const handleConfirmDate = (date) => {
    setDateVis(false);
    const formateDate = dayjs(date).format("YYYY-MM");
    console.log(formateDate, monthBill);
    setcurMonthBill(monthBill[formateDate] || []);
    setcurDate(formateDate);
  };

  const monthResult = useMemo(() => {
    const pay = curMonthBill
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + Number(c.money), 0);
    const income = curMonthBill
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + Number(c.money), 0);
    return { pay, income, total: pay + income };
  }, [curMonthBill]);

  // 初始化的时候，把当前月的账单数据存储到 curMonthBill 中
  useEffect(() => {
    const now = dayjs(new Date()).format("YYYY-MM");
    setcurMonthBill(monthBill[now] || []);
  }, [monthBill]);

  // 当前月按日分组
  const dayBill = useMemo(() => {
    const dayGroup = _.groupBy(curMonthBill, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    return {
      keys: Object.keys(dayGroup),
      dayGroup,
    };
  }, [curMonthBill]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVis(true)}>
            <span className="text">{curDate}月账单</span>
            {/* 思路：根据当前弹框打开的状态控制expand类名是否存在 */}
            <span className={classNames("arrow", dateVis && "expand")}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            max={new Date()}
            visible={dateVis}
            onCancel={() => setDateVis(false)}
            onConfirm={handleConfirmDate}
            onClose={() => setDateVis(false)}
          />
        </div>
        {/* 单日列表统计 */}
        {dayBill.keys.map((key) => {
          return (
            <DayBill key={key} date={key} billList={dayBill.dayGroup[key]} />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
