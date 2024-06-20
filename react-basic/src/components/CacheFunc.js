import { memo } from "react";

const CacheFunc = ({ onChange }) => {
  console.log("Rendering CacheFunc");
  return <input type="text" onChange={(e) => onChange(e.target.value)}></input>;
};

const Input = memo(CacheFunc);

export default Input;
