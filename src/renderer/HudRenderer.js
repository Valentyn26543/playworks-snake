export class HudRenderer {
  render(renderer, snapshot) {
    const context = renderer.getContext();
    const width = renderer.getWidth();

    context.save();
    const panelGradient = context.createLinearGradient(0, 0, width, 0);
    panelGradient.addColorStop(0, 'rgba(8, 13, 20, 0.88)');
    panelGradient.addColorStop(0.52, 'rgba(8, 13, 20, 0.28)');
    panelGradient.addColorStop(1, 'rgba(8, 13, 20, 0.88)');
    context.fillStyle = panelGradient;
    context.fillRect(0, 0, width, 136);

    context.strokeStyle = 'rgba(45, 212, 191, 0.28)';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, 136);
    context.lineTo(width, 136);
    context.stroke();

    context.fillStyle = '#ecfeff';
    context.font = '700 44px Arial, sans-serif';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.shadowColor = 'rgba(45, 212, 191, 0.36)';
    context.shadowBlur = 12;
    context.fillText('SNAKE', 48, 34);

    context.shadowColor = 'transparent';
    context.fillStyle = '#bef264';
    context.font = '700 28px Arial, sans-serif';
    context.fillText(`Score: ${snapshot.score}`, 48, 92);

    context.fillStyle = '#cbd5e1';
    context.font = '22px Arial, sans-serif';
    context.textAlign = 'right';
    context.fillText('Arrows - Move', width - 48, 42);
    context.fillText('Enter - OK', width - 48, 76);
    context.fillText('Backspace - Cancel', width - 48, 110);
    context.restore();
  }
}
