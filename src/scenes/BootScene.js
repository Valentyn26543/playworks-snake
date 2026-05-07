import { START_DIALOG } from '../app/constants.js';

export class BootScene {
  constructor({ config, sceneManager }) {
    this.config = config;
    this.sceneManager = sceneManager;
    this.elapsedTime = 0;
    this.bootDuration = 1000;
    this.hasCompleted = false;
  }

  init() {}

  enter() {
    this.elapsedTime = 0;
    this.hasCompleted = false;
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime;

    if (!this.hasCompleted && this.elapsedTime >= this.bootDuration) {
      this.hasCompleted = true;
      this.sceneManager.switchTo(START_DIALOG);
    }
  }

  render(renderer) {
    const context = renderer.getContext();
    const width = renderer.getWidth();
    const height = renderer.getHeight();

    context.fillStyle = this.config.backgroundColor;
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#f4f7fb';
    context.font = '48px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Loading...', width / 2, height / 2);
  }

  exit() {}

  destroy() {}

  handleInput() {}
}
