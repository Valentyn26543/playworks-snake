import {
  CANCEL,
  CONFIRM,
  DOWN,
  LEFT,
  POINTER_DOWN,
  RIGHT,
  UP,
} from '../input/InputActions.js';

export class StartDialogScene {
  constructor(config) {
    this.config = config;
    this.message = 'Use arrows, Enter, Backspace, or click';
  }

  init() {}

  enter() {
    this.message = 'Use arrows, Enter, Backspace, or click';
  }

  update() {}

  render(renderer) {
    const context = renderer.getContext();
    const width = renderer.getWidth();
    const height = renderer.getHeight();

    context.fillStyle = this.config.backgroundColor;
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#f4f7fb';
    context.font = '44px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Start Screen Placeholder', width / 2, height / 2 - 36);

    context.fillStyle = '#b7c2d1';
    context.font = '28px Arial, sans-serif';
    context.fillText(this.message, width / 2, height / 2 + 32);
  }

  exit() {}

  destroy() {}

  handleInput(action, payload) {
    if (action === UP) {
      this.message = 'Up pressed';
      return;
    }

    if (action === DOWN) {
      this.message = 'Down pressed';
      return;
    }

    if (action === LEFT) {
      this.message = 'Left pressed';
      return;
    }

    if (action === RIGHT) {
      this.message = 'Right pressed';
      return;
    }

    if (action === CONFIRM) {
      this.message = 'Confirm pressed';
      return;
    }

    if (action === CANCEL) {
      this.message = 'Cancel pressed';
      return;
    }

    if (action === POINTER_DOWN && payload) {
      this.message = `Click: ${Math.round(payload.x)}, ${Math.round(payload.y)}`;
    }
  }
}
