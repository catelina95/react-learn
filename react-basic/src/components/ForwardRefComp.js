import { forwardRef } from "react";

const InputComponent = forwardRef((props, ref) => {
  <input ref={ref} {...props} />;
});

export default InputComponent;
