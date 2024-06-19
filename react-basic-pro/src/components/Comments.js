const Comments = ({ item, onDeleteComment, user }) => {
  return (
    <div className="reply-list" key={item.rpid}>
      {/* 评论项 */}
      <div className="reply-item">
        {/* 头像 */}
        <div className="root-reply-avatar">
          <div className="bili-avatar">
            <img className="bili-avatar-img" alt="" src={item.user.avatar} />
          </div>
        </div>

        <div className="content-wrap">
          {/* 用户名 */}
          <div className="user-info">
            <div className="user-name">{item.user.uname}</div>
          </div>
          {/* 评论内容 */}
          <div className="root-reply">
            <span className="reply-content">{item.content}</span>
            <div className="reply-info">
              {/* 评论时间 */}
              <span className="reply-time">{item.ctime}</span>
              {/* 评论数量 */}
              <span className="reply-time">点赞数:{item.like}</span>
              {user.uid === item.user.uid && (
                <span
                  className="delete-btn"
                  onClick={() => onDeleteComment(item.rpid)}
                >
                  删除
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
