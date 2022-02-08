import { useCallback, useState } from 'react';

type UseToggleReturn = [isVisible: boolean, hanldeToggle: () => void];

const useToggle = (initialValue: boolean = true): UseToggleReturn => {
  const [isVisible, setIsVisible] = useState<boolean>(initialValue);

  const hanldeToggle = useCallback(() => {
    setIsVisible((isVisible) => !isVisible);
  }, []);

  return [isVisible, hanldeToggle];
};

export default useToggle;
