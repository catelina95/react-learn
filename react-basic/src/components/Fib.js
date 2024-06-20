import { useMemo, useState } from "react";

const calFib = (n) => {
  console.log("Calculating Fib");
  if (n < 3) return 1;
  return calFib(n - 1) + calFib(n - 2);
};

const Fib = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  console.log("Rendering Fib");
  // 此时点击 count2 按钮，也会重新计算 result 的值
  // const result = calFib(count1);

  // 此时点击 count2 按钮，不会重新计算 result 的值
  const result = useMemo(() => calFib(count1), [count1]);
  return (
    <div>
      <h1>Fib</h1>
      <button onClick={() => setCount1(count1 + 1)}>
        Change Count1: {count1}
      </button>
      <button onClick={() => setCount2(count2 + 1)}>
        Change Count2: {count2}
      </button>
      {result}
    </div>
  );
};

export default Fib;
