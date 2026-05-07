export class CanvasRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    if (!this.context) {
      throw new Error('CanvasRenderer requires a 2D canvas context.');
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
  }

  getContext() {
    return this.context;
  }

  getWidth() {
    return this.canvas.width;
  }

  getHeight() {
    return this.canvas.height;
  }
}
