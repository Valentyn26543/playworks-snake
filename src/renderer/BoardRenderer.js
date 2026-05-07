export class BoardRenderer {
  constructor(config) {
    this.config = config;
    this.borderSize = 56;
    this.cornerRadius = 88;
  }

  getLayout(renderer) {
    const playWidth = this.config.board.columns * this.config.board.cellSize;
    const playHeight = this.config.board.rows * this.config.board.cellSize;
    const outerWidth = playWidth + this.borderSize * 2;
    const outerHeight = playHeight + this.borderSize * 2;
    const outerX = Math.round((renderer.getWidth() - outerWidth) / 2);
    const outerY = Math.round((renderer.getHeight() - outerHeight) / 2);

    return {
      outerX,
      outerY,
      outerWidth,
      outerHeight,
      playX: outerX + this.borderSize,
      playY: outerY + this.borderSize,
      playWidth,
      playHeight,
    };
  }

  render(renderer) {
    const context = renderer.getContext();
    const layout = this.getLayout(renderer);

    this.drawOuterShadow(context, layout);
    this.drawStripedBorder(context, layout);
    this.drawPlayField(context, layout);

    return layout;
  }

  drawOuterShadow(context, layout) {
    context.save();
    context.shadowColor = 'rgba(0, 0, 0, 0.32)';
    context.shadowBlur = 28;
    context.shadowOffsetY = 16;
    this.createRoundRectPath(
      context,
      layout.outerX,
      layout.outerY,
      layout.outerWidth,
      layout.outerHeight,
      this.cornerRadius,
    );
    context.fillStyle = '#2e7d32';
    context.fill();
    context.restore();
  }

  drawStripedBorder(context, layout) {
    context.save();
    this.createRoundRectPath(
      context,
      layout.outerX,
      layout.outerY,
      layout.outerWidth,
      layout.outerHeight,
      this.cornerRadius,
    );
    context.clip();

    const borderGradient = context.createLinearGradient(
      layout.outerX,
      layout.outerY,
      layout.outerX + layout.outerWidth,
      layout.outerY + layout.outerHeight,
    );
    borderGradient.addColorStop(0, '#4fa73b');
    borderGradient.addColorStop(0.5, '#2f8e35');
    borderGradient.addColorStop(1, '#1f7431');
    context.fillStyle = borderGradient;
    context.fillRect(
      layout.outerX,
      layout.outerY,
      layout.outerWidth,
      layout.outerHeight,
    );

    this.drawBorderStripes(context, layout);

    context.lineWidth = 2;
    context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    this.strokeRoundRect(
      context,
      layout.outerX + 1,
      layout.outerY + 1,
      layout.outerWidth - 2,
      layout.outerHeight - 2,
      this.cornerRadius,
    );
    context.restore();
  }

  drawBorderStripes(context, layout) {
    context.save();
    context.fillStyle = '#d7d646';
    const stripeLength = 62;
    const stripeWidth = 34;
    const step = 132;
    const top = layout.outerY + 4;
    const bottom = layout.outerY + layout.outerHeight - this.borderSize + 4;
    const left = layout.outerX + 4;
    const right = layout.outerX + layout.outerWidth - this.borderSize + 4;

    for (let x = layout.outerX + 86; x < layout.outerX + layout.outerWidth - 80; x += step) {
      this.drawCapsule(context, x, top, stripeWidth, stripeLength, stripeWidth / 2);
      this.drawCapsule(context, x, bottom, stripeWidth, stripeLength, stripeWidth / 2);
    }

    for (let y = layout.outerY + 86; y < layout.outerY + layout.outerHeight - 80; y += step) {
      this.drawCapsule(context, left, y, stripeLength, stripeWidth, stripeWidth / 2);
      this.drawCapsule(context, right, y, stripeLength, stripeWidth, stripeWidth / 2);
    }

    context.restore();
  }

  drawPlayField(context, layout) {
    context.save();
    const fieldRadius = 28;
    const fieldGradient = context.createLinearGradient(
      layout.playX,
      layout.playY,
      layout.playX,
      layout.playY + layout.playHeight,
    );
    fieldGradient.addColorStop(0, '#5abe35');
    fieldGradient.addColorStop(1, '#3ea128');

    context.shadowColor = 'rgba(0, 0, 0, 0.24)';
    context.shadowBlur = 18;
    context.shadowOffsetY = 8;
    this.createRoundRectPath(
      context,
      layout.playX,
      layout.playY,
      layout.playWidth,
      layout.playHeight,
      fieldRadius,
    );
    context.fillStyle = fieldGradient;
    context.fill();

    context.shadowColor = 'transparent';
    context.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    context.lineWidth = 2;
    this.strokeRoundRect(
      context,
      layout.playX + 1,
      layout.playY + 1,
      layout.playWidth - 2,
      layout.playHeight - 2,
      fieldRadius,
    );
    context.restore();
  }

  drawCapsule(context, x, y, width, height, radius) {
    this.createRoundRectPath(context, x, y, width, height, radius);
    context.fill();
  }

  strokeRoundRect(context, x, y, width, height, radius) {
    this.createRoundRectPath(context, x, y, width, height, radius);
    context.stroke();
  }

  createRoundRectPath(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
    );
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
  }
}
