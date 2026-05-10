import { START_DIALOG } from '../app/constants.js';
import { BackgroundRenderer } from '../renderer/BackgroundRenderer.js';

export class BootScene {
  constructor({ config, sceneManager }) {
    this.config = config;
    this.sceneManager = sceneManager;
    this.backgroundRenderer = new BackgroundRenderer();
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

    this.backgroundRenderer.render(renderer);

    context.fillStyle = '#ecfeff';
    context.font = '700 48px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.shadowColor = 'rgba(45, 212, 191, 0.36)';
    context.shadowBlur = 14;
    context.fillText('Loading...', width / 2, height / 2);
  }

  exit() {}

  destroy() {}

  handleInput() {}
}
