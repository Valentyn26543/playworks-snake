export class BootScene {
  constructor(config) {
    this.config = config;
    this.elapsedTime = 0;
  }

  init() {}

  enter() {
    this.elapsedTime = 0;
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime;
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
