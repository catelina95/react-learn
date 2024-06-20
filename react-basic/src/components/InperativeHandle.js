import { forwardRef, useImperativeHandle, useRef } from "react";

const InperativeHandle = forwardRef(({ props, ref }) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = "";
    },
  }));
  return <input type="text" ref={inputRef} />;
});

export default InperativeHandle;
