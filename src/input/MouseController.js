export class MouseController {
  constructor(target) {
    this.target = target;
    this.onPointerDown = () => {};
  }

  start() {
    this.target?.addEventListener('pointerdown', this.onPointerDown);
  }

  stop() {
    this.target?.removeEventListener('pointerdown', this.onPointerDown);
  }
}
