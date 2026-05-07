export class MovementSystem {
  getNextHead(snake) {
    const head = snake.getHead();

    if (!head) {
      return null;
    }

    const directionOffsets = {
      UP: { x: 0, y: -1 },
      RIGHT: { x: 1, y: 0 },
      DOWN: { x: 0, y: 1 },
      LEFT: { x: -1, y: 0 },
    };
    const offset = directionOffsets[snake.direction] ?? directionOffsets.RIGHT;

    return {
      x: head.x + offset.x,
      y: head.y + offset.y,
    };
  }

  move(snake, shouldGrow = false) {
    const nextHead = this.getNextHead(snake);

    if (!nextHead) {
      return;
    }

    snake.body.unshift(nextHead);

    if (!shouldGrow) {
      snake.body.pop();
    }
  }
}
