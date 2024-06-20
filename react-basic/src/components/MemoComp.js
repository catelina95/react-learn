import { memo } from "react";

// 1. 简单类型 num
// 2. 引用类型 list
const MemoComp = ({ num, list }) => {
  console.log("Rendering Memo Component");
  return (
    <h1>
      Memo Component: {num} - {list}
    </h1>
  );
};

const cacheMemoComp = memo(MemoComp);

export default cacheMemoComp;
