import "./App.scss";
import avatar from "./images/bozai.png";
import { useRef, useState } from "react";
import _ from "lodash";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { useGetList } from "./hooks/useFetchData";
import Comments from "./components/Comments";

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 当前登录用户信息
const user = {
  // 用户id
  uid: "30009257",
  // 用户头像
  avatar,
  // 用户昵称
  uname: "黑马前端",
};

// 导航 Tab 数组
const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];

const App = () => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useGetList();
  const [activeTab, setActiveTab] = useState("hot");
  const commentRef = useRef(null);

  const deleteComment = (rpid) => {
    console.log("删除评论", rpid);
    const newList = commentList.filter((item) => item.rpid !== rpid);
    setCommentList(newList);
  };

  const handleActiveTab = (type) => {
    setActiveTab(type);
    if (type === "hot") {
      setCommentList(_.orderBy(commentList, "like", "desc"));
    } else {
      setCommentList(_.orderBy(commentList, "ctime", "desc"));
    }
  };

  const publishComment = () => {
    if (!comment) {
      alert("请输入评论内容");
      return;
    }
    const newComment = {
      rpid: uuidv4(),
      user,
      content: comment,
      ctime: dayjs().format("MM-DD HH:mm"),
      like: 0,
    };
    setCommentList([newComment, ...commentList]);
    setComment(""); // 清空内容
    commentRef.current.focus(); // 聚焦到输入框
  };

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{commentList.length}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map((tab) => (
              <span
                key={tab.type}
                // className={`nav-item ${activeTab === tab.type && "active"}`}
                className={classNames("nav-item", {
                  active: activeTab === tab.type,
                })}
                onClick={() => handleActiveTab(tab.type)}
              >
                {tab.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              ref={commentRef}
              value={comment}
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              onChange={(e) => setComment(e.target.value)}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send" onClick={publishComment}>
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        {commentList.map((item) => (
          <Comments
            key={item.rpid}
            item={item}
            user={user}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
