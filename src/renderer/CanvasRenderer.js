export class CanvasRenderer {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.context = canvas.getContext('2d');
  }

  clear() {
    this.context.fillStyle = this.config.backgroundColor;
    this.context.fillRect(0, 0, this.config.width, this.config.height);
  }
}
