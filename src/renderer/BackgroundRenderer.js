export class BackgroundRenderer {
  render(renderer) {
    const context = renderer.getContext();
    const width = renderer.getWidth();
    const height = renderer.getHeight();

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#07090f');
    gradient.addColorStop(0.48, '#101722');
    gradient.addColorStop(1, '#171014');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    this.drawAccentBands(context, width, height);
    this.drawGrid(context, width, height);
    this.drawScanlines(context, width, height);
    this.drawVignette(context, width, height);
  }

  drawGrid(context, width, height) {
    context.save();
    context.strokeStyle = 'rgba(90, 214, 255, 0.075)';
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

  drawAccentBands(context, width, height) {
    context.save();
    context.lineWidth = 2;

    const cyanBand = context.createLinearGradient(0, 0, width, 0);
    cyanBand.addColorStop(0, 'rgba(45, 212, 191, 0)');
    cyanBand.addColorStop(0.5, 'rgba(45, 212, 191, 0.18)');
    cyanBand.addColorStop(1, 'rgba(45, 212, 191, 0)');
    context.strokeStyle = cyanBand;

    for (let y = 118; y < height; y += 164) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y - 72);
      context.stroke();
    }

    const roseBand = context.createLinearGradient(0, 0, width, 0);
    roseBand.addColorStop(0, 'rgba(244, 63, 94, 0)');
    roseBand.addColorStop(0.5, 'rgba(244, 63, 94, 0.12)');
    roseBand.addColorStop(1, 'rgba(244, 63, 94, 0)');
    context.strokeStyle = roseBand;

    for (let y = 198; y < height + 120; y += 220) {
      context.beginPath();
      context.moveTo(0, y - 88);
      context.lineTo(width, y);
      context.stroke();
    }

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

  drawVignette(context, width, height) {
    context.save();
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.28)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.32)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    context.restore();
  }
}
