const UP = 'UP';
const RIGHT = 'RIGHT';
const DOWN = 'DOWN';
const LEFT = 'LEFT';

const REVERSE_DIRECTIONS = {
  [UP]: DOWN,
  [RIGHT]: LEFT,
  [DOWN]: UP,
  [LEFT]: RIGHT,
};

export class SnakeModel {
  constructor() {
    this.body = [];
    this.direction = RIGHT;
    this.nextDirection = RIGHT;
  }

  reset(startPosition) {
    this.direction = RIGHT;
    this.nextDirection = RIGHT;
    this.body = [
      { x: startPosition.x, y: startPosition.y },
      { x: startPosition.x - 1, y: startPosition.y },
      { x: startPosition.x - 2, y: startPosition.y },
    ];
  }

  setDirection(direction) {
    if (!direction || REVERSE_DIRECTIONS[this.direction] === direction) {
      return;
    }

    this.nextDirection = direction;
  }

  applyNextDirection() {
    this.direction = this.nextDirection;
  }

  getHead() {
    return this.body[0] ?? null;
  }
}
