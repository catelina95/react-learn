import { useState } from "react";
export const useToggle = () => {
  const [value, setValue] = useState(true);
  const toggle = () => setValue(!value);
  return [value, toggle];
};
