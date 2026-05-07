export class KeyboardController {
  constructor(target = window) {
    this.target = target;
    this.onKeyDown = () => {};
  }

  start() {
    this.target.addEventListener('keydown', this.onKeyDown);
  }

  stop() {
    this.target.removeEventListener('keydown', this.onKeyDown);
  }
}
