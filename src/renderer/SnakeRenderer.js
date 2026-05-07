export class SnakeRenderer {
  render(renderer, snapshot, boardLayout) {
    snapshot.snakeBody.forEach((cell, index) => {
      this.drawSegment(renderer.getContext(), cell, boardLayout, index === 0);
    });
  }

  drawSegment(context, cell, boardLayout, isHead) {
    const padding = isHead ? 2 : 3;
    const x = boardLayout.x + cell.x * boardLayout.cellSize + padding;
    const y = boardLayout.y + cell.y * boardLayout.cellSize + padding;
    const size = boardLayout.cellSize - padding * 2;
    const radius = isHead ? 6 : 5;

    context.save();
    context.shadowColor = isHead
      ? 'rgba(12, 74, 30, 0.42)'
      : 'rgba(12, 74, 30, 0.22)';
    context.shadowBlur = isHead ? 8 : 4;
    context.shadowOffsetY = 2;

    const gradient = context.createLinearGradient(x, y, x, y + size);
    gradient.addColorStop(0, isHead ? '#7ced4b' : '#62c83d');
    gradient.addColorStop(1, isHead ? '#258d37' : '#2d9c35');
    context.fillStyle = gradient;
    this.roundRect(context, x, y, size, size, radius);
    context.fill();

    context.shadowColor = 'transparent';
    context.strokeStyle = isHead
      ? 'rgba(240, 255, 232, 0.68)'
      : 'rgba(240, 255, 232, 0.2)';
    context.lineWidth = isHead ? 2 : 1;
    this.roundRect(context, x, y, size, size, radius);
    context.stroke();

    if (isHead) {
      this.drawEyes(context, x, y, size);
    }

    context.restore();
  }

  drawEyes(context, x, y, size) {
    const eyeY = y + size * 0.34;
    const leftEyeX = x + size * 0.34;
    const rightEyeX = x + size * 0.66;

    context.fillStyle = '#f8fff4';
    context.beginPath();
    context.arc(leftEyeX, eyeY, 2.6, 0, Math.PI * 2);
    context.arc(rightEyeX, eyeY, 2.6, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = '#142117';
    context.beginPath();
    context.arc(leftEyeX + 0.8, eyeY, 1.2, 0, Math.PI * 2);
    context.arc(rightEyeX + 0.8, eyeY, 1.2, 0, Math.PI * 2);
    context.fill();
  }

  roundRect(context, x, y, width, height, radius) {
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
