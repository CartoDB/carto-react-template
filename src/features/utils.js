export function debounce(fn, ms, sharedScope = {}) {
  // let timer;
  return () => {
    let { timer } = sharedScope;
    clearTimeout(timer);
    sharedScope.timer = setTimeout(() => {
      timer = null;
      debugger;
      fn.apply(this, arguments);
    }, ms);
  };
}
