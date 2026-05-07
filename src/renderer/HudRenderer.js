export class HudRenderer {
  render(renderer, snapshot) {
    const context = renderer.getContext();
    const width = renderer.getWidth();

    context.save();
    context.fillStyle = '#eafff5';
    context.font = '700 44px Arial, sans-serif';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText('SNAKE', 48, 34);

    context.fillStyle = '#b7f7c8';
    context.font = '700 28px Arial, sans-serif';
    context.fillText(`Score: ${snapshot.score}`, 48, 92);

    context.fillStyle = '#c8d3df';
    context.font = '22px Arial, sans-serif';
    context.textAlign = 'right';
    context.fillText('Arrows - Move', width - 48, 42);
    context.fillText('Enter - OK', width - 48, 76);
    context.fillText('Backspace - Cancel', width - 48, 110);
    context.restore();
  }
}
