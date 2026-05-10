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

    this.drawFrame(context, this.layout);
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
    context.shadowColor = 'rgba(0, 0, 0, 0.42)';
    context.shadowBlur = 28;
    context.shadowOffsetY = 16;

    const gradient = context.createLinearGradient(
      layout.x,
      layout.y,
      layout.x,
      layout.y + layout.height,
    );
    gradient.addColorStop(0, '#14231e');
    gradient.addColorStop(0.5, '#101b18');
    gradient.addColorStop(1, '#0d1615');

    context.fillStyle = gradient;
    context.fillRect(layout.x, layout.y, layout.width, layout.height);

    for (let row = 0; row < layout.rows; row += 1) {
      for (let column = 0; column < layout.columns; column += 1) {
        const isAlt = (row + column) % 2 === 0;
        context.fillStyle = isAlt
          ? 'rgba(34, 197, 94, 0.055)'
          : 'rgba(45, 212, 191, 0.035)';
        context.fillRect(
          layout.x + column * layout.cellSize,
          layout.y + row * layout.cellSize,
          layout.cellSize,
          layout.cellSize,
        );
      }
    }

    context.restore();
  }

  drawFrame(context, layout) {
    context.save();
    const frame = {
      x: layout.x - 16,
      y: layout.y - 16,
      width: layout.width + 32,
      height: layout.height + 32,
    };

    context.shadowColor = 'rgba(45, 212, 191, 0.18)';
    context.shadowBlur = 18;
    context.fillStyle = '#090d12';
    context.fillRect(frame.x, frame.y, frame.width, frame.height);

    context.shadowColor = 'transparent';
    context.strokeStyle = 'rgba(45, 212, 191, 0.34)';
    context.lineWidth = 2;
    context.strokeRect(frame.x + 0.5, frame.y + 0.5, frame.width - 1, frame.height - 1);

    context.strokeStyle = 'rgba(244, 63, 94, 0.24)';
    context.strokeRect(frame.x + 8.5, frame.y + 8.5, frame.width - 17, frame.height - 17);
    context.restore();
  }

  drawGrid(context, layout) {
    context.save();
    context.strokeStyle = 'rgba(148, 163, 184, 0.12)';
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
    context.lineWidth = 3;
    context.strokeStyle = 'rgba(187, 247, 208, 0.58)';
    context.strokeRect(layout.x, layout.y, layout.width, layout.height);
    context.restore();
  }
}
