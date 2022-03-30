import { useEffect, useRef } from "react";

export default function usePrevious<T>(value: T) {
  const previousVal = useRef<T>(value);

  useEffect(() => {
    previousVal.current = value;
  }, [value]);

  return previousVal.current;
}