export default function hexToRGB(h: string) {
  let r: string = '0';
  let g: string = '0';
  let b: string = '0';

  // 3 digits
  if (h.length === 4) {
    r = h[1] + h[1];
    g = h[2] + h[2];
    b = h[3] + h[3];

    // 6 digits
  } else if (h.length === 7) {
    r = h[1] + h[2];
    g = h[3] + h[4];
    b = h[5] + h[6];
  }

  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
}
