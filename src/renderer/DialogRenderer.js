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
    context.fillStyle = 'rgba(0, 0, 0, 0.54)';
    context.fillRect(0, 0, width, height);
    context.restore();
  }

  drawPanel(context, panel) {
    context.save();
    context.shadowColor = 'rgba(0, 0, 0, 0.45)';
    context.shadowBlur = 30;
    context.shadowOffsetY = 18;
    this.fillRoundRect(context, panel.x, panel.y, panel.width, panel.height, 8);

    const gradient = context.createLinearGradient(
      panel.x,
      panel.y,
      panel.x,
      panel.y + panel.height,
    );
    gradient.addColorStop(0, '#151b25');
    gradient.addColorStop(0.58, '#0e141c');
    gradient.addColorStop(1, '#0a0d12');
    context.fillStyle = gradient;
    context.fill();

    context.shadowColor = 'transparent';
    context.lineWidth = 2;
    context.strokeStyle = 'rgba(45, 212, 191, 0.42)';
    this.strokeRoundRect(
      context,
      panel.x,
      panel.y,
      panel.width,
      panel.height,
      8,
    );

    context.strokeStyle = 'rgba(244, 63, 94, 0.24)';
    this.strokeRoundRect(
      context,
      panel.x + 8,
      panel.y + 8,
      panel.width - 16,
      panel.height - 16,
      6,
    );
    context.restore();
  }

  drawTitle(context, title, panel) {
    context.save();
    context.fillStyle = '#ecfeff';
    context.font = '700 72px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.shadowColor = 'rgba(45, 212, 191, 0.42)';
    context.shadowBlur = 18;
    context.fillText(title, panel.x + panel.width / 2, panel.y + 46);
    context.restore();
  }

  drawMessage(context, message, panel) {
    context.save();
    context.fillStyle = '#cbd5e1';
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
      gradient.addColorStop(1, '#22d3ee');
      context.shadowColor = 'rgba(45, 212, 191, 0.6)';
      context.shadowBlur = 20;
    } else {
      gradient.addColorStop(0, '#202937');
      gradient.addColorStop(1, '#151b26');
      context.shadowColor = 'rgba(0, 0, 0, 0.28)';
      context.shadowBlur = 10;
    }

    this.fillRoundRect(
      context,
      button.x,
      button.y,
      button.width,
      button.height,
      8,
    );
    context.fillStyle = gradient;
    context.fill();

    context.shadowColor = 'transparent';
    context.lineWidth = button.selected ? 3 : 2;
    context.strokeStyle = button.selected
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(153, 176, 204, 0.28)';
    this.strokeRoundRect(
      context,
      button.x,
      button.y,
      button.width,
      button.height,
      8,
    );

    if (button.selected) {
      context.strokeStyle = 'rgba(244, 63, 94, 0.82)';
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(button.x - 12, button.y + 10);
      context.lineTo(button.x - 12, button.y - 8);
      context.lineTo(button.x + 16, button.y - 8);
      context.moveTo(button.x + button.width + 12, button.y + button.height - 10);
      context.lineTo(button.x + button.width + 12, button.y + button.height + 8);
      context.lineTo(button.x + button.width - 16, button.y + button.height + 8);
      context.stroke();
    }

    context.fillStyle = button.selected ? '#041014' : '#edf6ff';
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
