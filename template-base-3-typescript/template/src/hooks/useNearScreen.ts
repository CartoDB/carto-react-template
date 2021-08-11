import { useEffect, useRef, useState } from 'react';

export function useNearScreen({
  options,
  singleUse,
}: {
  options: IntersectionObserver;
  singleUse: boolean;
}) {
  const fromRef = useRef(null);
  const [isNearScreen, setIsNearScreen] = useState(false);

  useEffect(() => {
    const onChange: IntersectionObserverCallback = (entries, observer) => {
      const [el] = entries;

      setIsNearScreen(el.isIntersecting);

      if (singleUse) {
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(onChange, options);
    const node = fromRef?.current;

    //@ts-ignore
    observer.observe(node);

    return () => observer.disconnect();
  });

  return { isNearScreen, fromRef };
}
