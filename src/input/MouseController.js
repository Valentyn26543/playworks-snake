import { POINTER_DOWN, POINTER_MOVE, POINTER_UP } from './InputActions.js';

export class MouseController {
  constructor({ canvas, sceneManager }) {
    this.canvas = canvas;
    this.sceneManager = sceneManager;
    this.onMouseMove = (event) => this.handleMouseEvent(event, POINTER_MOVE);
    this.onMouseDown = (event) => this.handleMouseEvent(event, POINTER_DOWN);
    this.onMouseUp = (event) => this.handleMouseEvent(event, POINTER_UP);
  }

  start() {
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
  }

  getCanvasPosition(event) {
    const bounds = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / bounds.width;
    const scaleY = this.canvas.height / bounds.height;

    return {
      x: (event.clientX - bounds.left) * scaleX,
      y: (event.clientY - bounds.top) * scaleY,
    };
  }

  handleMouseEvent(event, action) {
    event.preventDefault();
    this.sceneManager.handleInput(action, this.getCanvasPosition(event));
  }

  destroy() {
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
  }
}
