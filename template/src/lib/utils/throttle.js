export function throttle(fn, ms) {
  var lastTime = 0;
  return function () {
    var now = new Date();
    if (now - lastTime >= ms) {
      fn();
      lastTime = now;
    }
  };
}
