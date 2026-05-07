import { BackgroundRenderer } from '../renderer/BackgroundRenderer.js';

export class GameOverDialogScene {
  constructor() {
    this.backgroundRenderer = new BackgroundRenderer();
    this.finalScore = 0;
  }

  init() {}

  enter(params = {}) {
    this.finalScore = params.finalScore ?? 0;
  }

  update() {}

  render(renderer) {
    this.backgroundRenderer.render(renderer);

    const context = renderer.getContext();
    context.save();
    context.fillStyle = '#eafff5';
    context.font = '700 56px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(
      'Game Over',
      renderer.getWidth() / 2,
      renderer.getHeight() / 2 - 36,
    );

    context.fillStyle = '#b7f7c8';
    context.font = '32px Arial, sans-serif';
    context.fillText(
      `Score: ${this.finalScore}`,
      renderer.getWidth() / 2,
      renderer.getHeight() / 2 + 28,
    );
    context.restore();
  }

  exit() {}

  destroy() {}

  handleInput() {}
}
