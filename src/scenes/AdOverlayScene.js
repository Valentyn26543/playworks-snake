import { GAME } from '../app/constants.js';
import { BackgroundRenderer } from '../renderer/BackgroundRenderer.js';

export class AdOverlayScene {
  constructor({ sceneManager, imaService }) {
    this.sceneManager = sceneManager;
    this.imaService = imaService;
    this.backgroundRenderer = new BackgroundRenderer();
    this.elapsedTime = 0;
    this.maxDuration = 9000;
    this.nextScene = GAME;
    this.hasCompleted = false;
    this.requestId = 0;
  }

  init() {}

  enter(params = {}) {
    this.elapsedTime = 0;
    this.hasCompleted = false;
    this.nextScene = params.nextScene ?? GAME;
    this.requestId += 1;
    this.runAdFlow(this.requestId);
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime;

    if (!this.hasCompleted && this.elapsedTime >= this.maxDuration) {
      this.complete();
    }
  }

  render(renderer) {
    this.backgroundRenderer.render(renderer);

    const context = renderer.getContext();
    context.save();
    context.fillStyle = 'rgba(5, 8, 13, 0.58)';
    context.fillRect(0, 0, renderer.getWidth(), renderer.getHeight());

    context.fillStyle = '#eafff5';
    context.font = '700 48px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.shadowColor = 'rgba(38, 255, 154, 0.3)';
    context.shadowBlur = 16;
    context.fillText(
      'Loading ad...',
      renderer.getWidth() / 2,
      renderer.getHeight() / 2,
    );
    context.restore();
  }

  exit() {
    this.requestId += 1;
  }

  destroy() {}

  handleInput() {}

  async runAdFlow(requestId) {
    try {
      await this.imaService.showVideoAd();
    } catch {
      // The ad service is allowed to fail; gameplay must continue.
    }

    if (this.requestId === requestId) {
      this.complete();
    }
  }

  complete() {
    if (this.hasCompleted) {
      return;
    }

    this.hasCompleted = true;
    this.imaService.destroy();
    this.sceneManager.switchTo(this.nextScene);
  }
}
