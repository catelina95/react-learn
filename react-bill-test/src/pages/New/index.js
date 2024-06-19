import { NavBar, Button, DatePicker, Input } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import Icon from "@/components/Icon";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { billListData } from "@/constant";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { saveBillToServer } from "@/store/modules/billStore";

const New = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [billType, setBillType] = useState("pay"); // pay or income
  const [dateVisible, setDateVisible] = useState(false);
  const [useFor, setUseFor] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [money, setMoney] = useState(0);

  const dateConfirm = (date) => {
    setDate(dayjs(date).format("YYYY-MM-DD"));
    setDateVisible(false);
  };

  const handleSaveBill = () => {
    if (!money) return;
    const bill = {
      id: uuidv4(),
      date,
      money: billType === "pay" ? -Number(money) : Number(money),
      useFor,
      type: billType,
    };
    console.log(bill);
    dispatch(saveBillToServer(bill));
  };

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === "pay" ? "selected" : "")}
            onClick={() => setBillType("pay")}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === "income" ? "selected" : "")}
            shape="rounded"
            onClick={() => setBillType("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>
                {dayjs(date).format("YYYY-MM-DD")}
              </span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
                onCancel={() => setDateVisible(false)}
                onClose={() => setDateVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(val) => setMoney(val)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        "item",
                        useFor === item.type ? "selected" : ""
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={handleSaveBill}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
