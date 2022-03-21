import { useMemo, useState } from "react";

export type StateBooleanHandler = {
  setBooleanStateTrue: () => void;
  setBooleanStateFalse: () => void;
  toggleBooleanState: () => void;
}

export default function useBooleanStateController(initialVal: boolean): [boolean, StateBooleanHandler] {
  const [state, setstate] = useState<boolean>(initialVal);

  const stateBooleanHandler: StateBooleanHandler = useMemo(
    () => ({
      setBooleanStateTrue: () => setstate(true),
      setBooleanStateFalse: () => setstate(false),
      toggleBooleanState: () => setstate((prevState) => !prevState),
    }),
    []
  );

  return [state, stateBooleanHandler];
}