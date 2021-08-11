// adapted from here: https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
import { useLayoutEffect, useRef, RefObject } from 'react';

function getScrollPosition(element: HTMLElement | Window) {
  if (element instanceof Window) {
    return { x: element.pageXOffset, y: element.pageYOffset };
  }

  return { x: element.scrollLeft, y: element.scrollTop };
}

/**
 * @param {*} opts - configuration options
 * @param {*} element - DOM element wrapped from a `useRef` hook. If not defined, `window` will be used
 * @param {function} callback - function to call with the scroll measures. It must be wrapped in a `useCallback` hook
 * @param {number} delay - number of milliseconds for the timeout that separates one callback call from the other
 *  Example usage
```
  const scrollCallback = useCallback(({ y }) => {
    setScrolled(y > (scrolled ? 68 : 146))
  }, [scrolled])

  useScrollPosition({
    element: scrollerRef,
    delay: 200,
    callback: scrollCallback
  })
```
*/
export function useScrollPosition({
  element,
  callback,
  delay,
}: {
  element: RefObject<Element>;
  callback: Function;
  delay: number;
}) {
  const el = element?.current || window;
  let timeoutId = useRef(null);

  useLayoutEffect(() => {
    // NOTE: if el comes from a ref, `el.current` may not be defined at first render
    // so we skip the effect in this case
    if (!el) {
      return;
    }

    function handler() {
      //@ts-ignore
      callback(getScrollPosition(el));
      timeoutId.current = null;
    }

    function innerHandler() {
      if (!timeoutId.current) {
        //@ts-ignore
        timeoutId.current = window.setTimeout(handler, delay);
      }
    }

    el.addEventListener('scroll', innerHandler, { passive: true });
    return () => el.removeEventListener('scroll', innerHandler);
  }, [el, delay, callback]);
}
