import { forwardRef } from "react";

const InputComponent = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default InputComponent;
