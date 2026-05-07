import { GAME } from '../app/constants.js';
import { BackgroundRenderer } from '../renderer/BackgroundRenderer.js';

export class AdOverlayScene {
  constructor({ sceneManager }) {
    this.sceneManager = sceneManager;
    this.backgroundRenderer = new BackgroundRenderer();
    this.elapsedTime = 0;
    this.duration = 900;
    this.nextScene = GAME;
    this.hasCompleted = false;
  }

  init() {}

  enter(params = {}) {
    this.elapsedTime = 0;
    this.hasCompleted = false;
    this.nextScene = params.nextScene ?? GAME;
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime;

    if (!this.hasCompleted && this.elapsedTime >= this.duration) {
      this.hasCompleted = true;
      this.sceneManager.switchTo(this.nextScene);
    }
  }

  render(renderer) {
    this.backgroundRenderer.render(renderer);

    const context = renderer.getContext();
    context.save();
    context.fillStyle = '#eafff5';
    context.font = '48px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(
      'Loading ad...',
      renderer.getWidth() / 2,
      renderer.getHeight() / 2,
    );
    context.restore();
  }

  exit() {}

  destroy() {}

  handleInput() {}
}
