export class DialogRenderer {
  render(renderer, dialog) {
    const context = renderer.getContext();
    const width = renderer.getWidth();
    const height = renderer.getHeight();
    const panel = {
      x: Math.round(width / 2 - 310),
      y: Math.round(height / 2 - 180),
      width: 620,
      height: 360,
    };

    this.drawOverlay(context, width, height);
    this.drawPanel(context, panel);
    this.drawTitle(context, dialog.title, panel);
    this.drawMessage(context, dialog.message, panel);
    this.drawButtons(context, dialog.buttons);
  }

  drawOverlay(context, width, height) {
    context.save();
    context.fillStyle = 'rgba(0, 0, 0, 0.42)';
    context.fillRect(0, 0, width, height);
    context.restore();
  }

  drawPanel(context, panel) {
    context.save();
    context.shadowColor = 'rgba(0, 0, 0, 0.45)';
    context.shadowBlur = 28;
    context.shadowOffsetY = 18;
    this.fillRoundRect(context, panel.x, panel.y, panel.width, panel.height, 18);

    const gradient = context.createLinearGradient(
      panel.x,
      panel.y,
      panel.x,
      panel.y + panel.height,
    );
    gradient.addColorStop(0, '#172337');
    gradient.addColorStop(1, '#0d1421');
    context.fillStyle = gradient;
    context.fill();

    context.shadowColor = 'transparent';
    context.lineWidth = 2;
    context.strokeStyle = 'rgba(126, 240, 194, 0.34)';
    this.strokeRoundRect(
      context,
      panel.x,
      panel.y,
      panel.width,
      panel.height,
      18,
    );
    context.restore();
  }

  drawTitle(context, title, panel) {
    context.save();
    context.fillStyle = '#eafff5';
    context.font = '700 72px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.shadowColor = 'rgba(38, 255, 154, 0.38)';
    context.shadowBlur = 18;
    context.fillText(title, panel.x + panel.width / 2, panel.y + 46);
    context.restore();
  }

  drawMessage(context, message, panel) {
    context.save();
    context.fillStyle = '#c8d3df';
    context.font = '30px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';

    const lines = this.wrapText(context, message, panel.width - 120);
    lines.forEach((line, index) => {
      context.fillText(
        line,
        panel.x + panel.width / 2,
        panel.y + 154 + index * 38,
      );
    });

    context.restore();
  }

  drawButtons(context, buttons) {
    buttons.forEach((button) => this.drawButton(context, button));
  }

  drawButton(context, button) {
    context.save();
    const gradient = context.createLinearGradient(
      button.x,
      button.y,
      button.x,
      button.y + button.height,
    );

    if (button.selected) {
      gradient.addColorStop(0, '#50f7ad');
      gradient.addColorStop(1, '#18b784');
      context.shadowColor = 'rgba(80, 247, 173, 0.55)';
      context.shadowBlur = 18;
    } else {
      gradient.addColorStop(0, '#26364f');
      gradient.addColorStop(1, '#1a2638');
      context.shadowColor = 'rgba(0, 0, 0, 0.28)';
      context.shadowBlur = 10;
    }

    this.fillRoundRect(
      context,
      button.x,
      button.y,
      button.width,
      button.height,
      14,
    );
    context.fillStyle = gradient;
    context.fill();

    context.shadowColor = 'transparent';
    context.lineWidth = button.selected ? 3 : 2;
    context.strokeStyle = button.selected
      ? 'rgba(234, 255, 245, 0.9)'
      : 'rgba(153, 176, 204, 0.28)';
    this.strokeRoundRect(
      context,
      button.x,
      button.y,
      button.width,
      button.height,
      14,
    );

    context.fillStyle = button.selected ? '#071019' : '#edf6ff';
    context.font = '700 28px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(
      button.label,
      button.x + button.width / 2,
      button.y + button.height / 2,
    );
    context.restore();
  }

  wrapText(context, text, maxWidth) {
    const lines = [];

    text.split('\n').forEach((paragraph) => {
      const words = paragraph.split(' ');
      let line = '';

      words.forEach((word) => {
        const testLine = line ? `${line} ${word}` : word;

        if (context.measureText(testLine).width > maxWidth && line) {
          lines.push(line);
          line = word;
          return;
        }

        line = testLine;
      });

      if (line) {
        lines.push(line);
      }
    });

    return lines;
  }

  fillRoundRect(context, x, y, width, height, radius) {
    this.createRoundRectPath(context, x, y, width, height, radius);
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
