export class SnakeRenderer {
  render(renderer, { x, y, size = 132, direction = { x: 0, y: -1 } }) {
    const context = renderer.getContext();

    context.save();
    context.translate(x, y);
    this.rotateForDirection(context, direction);

    this.drawHead(context, size);
    this.drawEyes(context, size);

    context.restore();
  }

  rotateForDirection(context, direction) {
    if (direction.x === 1) {
      context.rotate(Math.PI / 2);
      return;
    }

    if (direction.x === -1) {
      context.rotate(-Math.PI / 2);
      return;
    }

    if (direction.y === 1) {
      context.rotate(Math.PI);
    }
  }

  drawHead(context, size) {
    const half = size / 2;

    context.save();
    context.shadowColor = 'rgba(0, 0, 0, 0.26)';
    context.shadowBlur = 14;
    context.shadowOffsetY = 10;

    const gradient = context.createLinearGradient(0, -half, 0, half);
    gradient.addColorStop(0, '#5dbd39');
    gradient.addColorStop(1, '#2f8f30');
    context.fillStyle = gradient;

    context.beginPath();
    context.moveTo(0, -half);
    context.bezierCurveTo(half * 0.7, -half * 0.5, half * 0.78, half * 0.34, half * 0.28, half);
    context.lineTo(-half * 0.28, half);
    context.bezierCurveTo(-half * 0.78, half * 0.34, -half * 0.7, -half * 0.5, 0, -half);
    context.fill();

    context.restore();

    context.fillStyle = 'rgba(255, 255, 255, 0.1)';
    context.beginPath();
    context.ellipse(-half * 0.2, -half * 0.1, half * 0.13, half * 0.38, -0.24, 0, Math.PI * 2);
    context.fill();
  }

  drawEyes(context, size) {
    const half = size / 2;

    this.drawEye(context, -half * 0.24, -half * 0.18, -0.24);
    this.drawEye(context, half * 0.24, -half * 0.18, 0.24);

    context.fillStyle = '#101318';
    context.beginPath();
    context.arc(-half * 0.15, -half * 0.48, 5, 0, Math.PI * 2);
    context.arc(half * 0.15, -half * 0.48, 5, 0, Math.PI * 2);
    context.fill();
  }

  drawEye(context, x, y, rotation) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.fillStyle = '#f7fbff';
    context.beginPath();
    context.ellipse(0, 0, 20, 10, 0, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = '#101318';
    context.beginPath();
    context.arc(4, 0, 4, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}
