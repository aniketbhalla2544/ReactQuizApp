import { useEffect, useState } from "react"
import useInititalRender from "./useInititalRender";

export default function useInitials(initialVal: string = "") {
  const [initials, setInitials] = useState(initialVal);
  const isInitialRender = useInititalRender();

  useEffect(() => {
    if (isInitialRender) {
      initialVal || setInitials("Aniket");
    }
  }, [initialVal, isInitialRender]);

  return initials;
}