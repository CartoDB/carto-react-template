export default function animateValue(start, end, duration, drawFrame) {
  if (start === end) return;
  const range = end - start;
  let current = start;
  const step = range / ((duration / 1000) * 60);
  const animate = () => {
    current += step;
    drawFrame(Math.floor(current));
    if ((step > 0 && current < end) || (step < 0 && current > end)) {
      requestAnimationFrame(animate);
    } else {
      drawFrame(end);
    }
  };
  requestAnimationFrame(animate);
}
