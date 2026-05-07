export class BackgroundRenderer {
  render(renderer) {
    const context = renderer.getContext();
    const width = renderer.getWidth();
    const height = renderer.getHeight();

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#071019');
    gradient.addColorStop(0.52, '#0d1724');
    gradient.addColorStop(1, '#111827');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    this.drawGrid(context, width, height);
    this.drawGlow(context, width, height);
    this.drawScanlines(context, width, height);
  }

  drawGrid(context, width, height) {
    context.save();
    context.strokeStyle = 'rgba(76, 201, 240, 0.08)';
    context.lineWidth = 1;

    for (let x = 0; x <= width; x += 40) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (let y = 0; y <= height; y += 40) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    context.restore();
  }

  drawGlow(context, width, height) {
    context.save();
    const glow = context.createRadialGradient(
      width / 2,
      height / 2,
      80,
      width / 2,
      height / 2,
      560,
    );
    glow.addColorStop(0, 'rgba(38, 255, 154, 0.14)');
    glow.addColorStop(0.45, 'rgba(76, 201, 240, 0.06)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
    context.restore();
  }

  drawScanlines(context, width, height) {
    context.save();
    context.fillStyle = 'rgba(255, 255, 255, 0.025)';

    for (let y = 0; y < height; y += 4) {
      context.fillRect(0, y, width, 1);
    }

    context.restore();
  }
}
