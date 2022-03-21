import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const [isMatching, setIsMatching] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryObj = window.matchMedia(query);
    setIsMatching(mediaQueryObj.matches);
    mediaQueryObj.onchange = (e) => {
      setIsMatching(e.matches);
    };
  }, [query])

  return isMatching
}