export function getCanvasContext(canvas) {
  return canvas.getContext('2d');
}

export function clearCanvas(context, width, height) {
  context.clearRect(0, 0, width, height);
}
