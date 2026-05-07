import { BackgroundRenderer } from "../renderer/BackgroundRenderer.js";

export class GameScene {
  constructor({ config }) {
    this.config = config;
    this.backgroundRenderer = new BackgroundRenderer();
  }

  init() {}

  enter() {}

  update() {}

  render(renderer) {
    this.backgroundRenderer.render(renderer);

    const context = renderer.getContext();
    context.save();
    context.fillStyle = "#eafff5";
    context.font = "48px Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(
      "Game scene",
      renderer.getWidth() / 2,
      renderer.getHeight() / 2,
    );
    context.restore();
  }

  exit() {}

  destroy() {}

  handleInput() {}
}
