export class FoodRenderer {
  render(renderer, { x, y, size = 58 }) {
    const context = renderer.getContext();
    const radius = size / 2;

    context.save();
    context.translate(x, y);

    context.shadowColor = 'rgba(0, 0, 0, 0.28)';
    context.shadowBlur = 10;
    context.shadowOffsetY = 8;

    const appleGradient = context.createRadialGradient(
      -radius * 0.35,
      -radius * 0.4,
      radius * 0.2,
      0,
      0,
      radius,
    );
    appleGradient.addColorStop(0, '#ff5a4f');
    appleGradient.addColorStop(0.54, '#e71820');
    appleGradient.addColorStop(1, '#a90815');

    context.fillStyle = appleGradient;
    context.beginPath();
    context.moveTo(0, -radius * 0.72);
    context.bezierCurveTo(
      radius * 0.88,
      -radius * 1.02,
      radius * 1.1,
      radius * 0.16,
      radius * 0.54,
      radius * 0.86,
    );
    context.bezierCurveTo(
      radius * 0.2,
      radius * 1.16,
      -radius * 0.2,
      radius * 1.16,
      -radius * 0.54,
      radius * 0.86,
    );
    context.bezierCurveTo(
      -radius * 1.1,
      radius * 0.16,
      -radius * 0.88,
      -radius * 1.02,
      0,
      -radius * 0.72,
    );
    context.fill();

    context.shadowColor = 'transparent';
    context.fillStyle = 'rgba(255, 255, 255, 0.45)';
    context.beginPath();
    context.ellipse(-radius * 0.34, -radius * 0.35, 8, 14, 0.6, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = '#6b3309';
    context.lineWidth = 6;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(1, -radius * 0.8);
    context.quadraticCurveTo(7, -radius * 1.18, 20, -radius * 1.1);
    context.stroke();

    context.fillStyle = '#55a923';
    context.beginPath();
    context.ellipse(18, -radius * 1.02, 14, 7, 0.35, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}
