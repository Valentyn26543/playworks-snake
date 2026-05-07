export class StartDialogScene {
  constructor(config) {
    this.config = config;
  }

  init() {}

  enter() {}

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
    context.fillText('Start Screen Placeholder', width / 2, height / 2);
  }

  exit() {}

  destroy() {}

  handleInput() {}
}
