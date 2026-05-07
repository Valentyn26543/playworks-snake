export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function vectorsEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}
