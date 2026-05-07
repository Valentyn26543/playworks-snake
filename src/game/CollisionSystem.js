import { board } from '../app/AppConfig.js';

export class CollisionSystem {
  constructor(boardSettings = board) {
    this.columns = boardSettings.columns;
    this.rows = boardSettings.rows;
  }

  hasWallCollision(cell) {
    if (!cell) {
      return false;
    }

    return (
      cell.x < 0 ||
      cell.x >= this.columns ||
      cell.y < 0 ||
      cell.y >= this.rows
    );
  }

  hasSelfCollision(snakeBody) {
    const head = snakeBody[0];

    if (!head) {
      return false;
    }

    return snakeBody
      .slice(1)
      .some((cell) => this.areSameCell(head, cell));
  }

  hasFoodCollision(head, foodPosition) {
    return this.areSameCell(head, foodPosition);
  }

  areSameCell(a, b) {
    return a?.x === b?.x && a?.y === b?.y;
  }
}
