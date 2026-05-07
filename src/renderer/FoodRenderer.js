export class FoodRenderer {
  render(renderer, snapshot, boardLayout) {
    const food = snapshot.foodPosition;

    if (!food) {
      return;
    }

    const context = renderer.getContext();
    const centerX =
      boardLayout.x + food.x * boardLayout.cellSize + boardLayout.cellSize / 2;
    const centerY =
      boardLayout.y + food.y * boardLayout.cellSize + boardLayout.cellSize / 2;
    const radius = boardLayout.cellSize * 0.38;

    context.save();
    context.shadowColor = 'rgba(255, 45, 85, 0.46)';
    context.shadowBlur = 12;
    context.shadowOffsetY = 2;

    const gradient = context.createRadialGradient(
      centerX - radius * 0.4,
      centerY - radius * 0.45,
      radius * 0.2,
      centerX,
      centerY,
      radius,
    );
    gradient.addColorStop(0, '#ffe66d');
    gradient.addColorStop(0.32, '#ff4d6d');
    gradient.addColorStop(1, '#b7094c');

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.fill();

    context.shadowColor = 'transparent';
    context.strokeStyle = 'rgba(255, 255, 255, 0.72)';
    context.lineWidth = 2;
    context.beginPath();
    context.arc(centerX, centerY, radius - 1, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = 'rgba(255, 255, 255, 0.7)';
    context.beginPath();
    context.arc(
      centerX - radius * 0.3,
      centerY - radius * 0.35,
      radius * 0.22,
      0,
      Math.PI * 2,
    );
    context.fill();
    context.restore();
  }
}
