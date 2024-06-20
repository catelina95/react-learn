import { memo } from "react";

const MemoComp = () => {
  console.log("Rendering Memo Component");
  return <h1>Memo Component</h1>;
};

const cacheMemoComp = memo(MemoComp);

export default cacheMemoComp;
