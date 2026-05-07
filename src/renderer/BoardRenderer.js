export class BoardRenderer {
  constructor(config) {
    this.config = config;
    this.layout = null;
  }

  render(renderer) {
    const context = renderer.getContext();
    const { columns, rows, cellSize } = this.config.board;
    const width = columns * cellSize;
    const height = rows * cellSize;
    const x = Math.round((renderer.getWidth() - width) / 2);
    const y = Math.round((renderer.getHeight() - height) / 2 + 24);

    this.layout = { x, y, width, height, columns, rows, cellSize };

    this.drawBoard(context, this.layout);
    this.drawGrid(context, this.layout);
    this.drawBorder(context, this.layout);

    return this.layout;
  }

  getBoardPosition() {
    return this.layout;
  }

  drawBoard(context, layout) {
    context.save();
    context.shadowColor = 'rgba(0, 0, 0, 0.35)';
    context.shadowBlur = 24;
    context.shadowOffsetY = 12;

    const gradient = context.createLinearGradient(
      layout.x,
      layout.y,
      layout.x,
      layout.y + layout.height,
    );
    gradient.addColorStop(0, '#5fbe37');
    gradient.addColorStop(1, '#3e9f2b');

    context.fillStyle = gradient;
    context.fillRect(layout.x, layout.y, layout.width, layout.height);
    context.restore();
  }

  drawGrid(context, layout) {
    context.save();
    context.strokeStyle = 'rgba(18, 94, 32, 0.22)';
    context.lineWidth = 1;

    for (let column = 1; column < layout.columns; column += 1) {
      const x = layout.x + column * layout.cellSize;
      context.beginPath();
      context.moveTo(x + 0.5, layout.y);
      context.lineTo(x + 0.5, layout.y + layout.height);
      context.stroke();
    }

    for (let row = 1; row < layout.rows; row += 1) {
      const y = layout.y + row * layout.cellSize;
      context.beginPath();
      context.moveTo(layout.x, y + 0.5);
      context.lineTo(layout.x + layout.width, y + 0.5);
      context.stroke();
    }

    context.restore();
  }

  drawBorder(context, layout) {
    context.save();
    context.lineWidth = 8;
    context.strokeStyle = '#276f2d';
    context.strokeRect(
      layout.x - 4,
      layout.y - 4,
      layout.width + 8,
      layout.height + 8,
    );

    context.lineWidth = 2;
    context.strokeStyle = 'rgba(233, 255, 223, 0.45)';
    context.strokeRect(layout.x, layout.y, layout.width, layout.height);
    context.restore();
  }
}
