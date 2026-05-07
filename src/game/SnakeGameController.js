import { board } from '../app/AppConfig.js';
import { pickRandomEmptyCell } from '../utils/random.js';
import { CollisionSystem } from './CollisionSystem.js';
import { FoodModel } from './FoodModel.js';
import { GAME_OVER, IDLE, RUNNING } from './GameState.js';
import { MovementSystem } from './MovementSystem.js';
import { SnakeModel } from './SnakeModel.js';

export class SnakeGameController {
  constructor(boardSettings = board) {
    this.board = boardSettings;
    this.state = IDLE;
    this.snake = new SnakeModel();
    this.food = new FoodModel();
    this.movementSystem = new MovementSystem();
    this.collisionSystem = new CollisionSystem(boardSettings);
    this.score = 0;
  }

  start() {
    this.restart();
  }

  restart() {
    this.score = 0;
    this.state = RUNNING;
    this.snake.reset(this.getStartPosition());
    this.spawnFood();
  }

  update() {
    if (this.state !== RUNNING) {
      return;
    }

    this.snake.applyNextDirection();

    const nextHead = this.movementSystem.getNextHead(this.snake);
    const willEatFood = this.collisionSystem.hasFoodCollision(
      nextHead,
      this.food.getPosition(),
    );

    this.movementSystem.move(this.snake, willEatFood);

    const head = this.snake.getHead();

    if (
      this.collisionSystem.hasWallCollision(head) ||
      this.collisionSystem.hasSelfCollision(this.snake.body)
    ) {
      this.state = GAME_OVER;
      return;
    }

    if (willEatFood) {
      this.score += 1;
      this.spawnFood();
    }
  }

  changeDirection(direction) {
    this.snake.setDirection(direction);
  }

  isGameOver() {
    return this.state === GAME_OVER;
  }

  getSnapshot() {
    return {
      snakeBody: this.snake.body.map((cell) => ({ ...cell })),
      foodPosition: this.food.getPosition()
        ? { ...this.food.getPosition() }
        : null,
      score: this.score,
      state: this.state,
    };
  }

  getStartPosition() {
    return {
      x: Math.floor(this.board.columns / 2),
      y: Math.floor(this.board.rows / 2),
    };
  }

  spawnFood() {
    const position = pickRandomEmptyCell(
      this.board.columns,
      this.board.rows,
      this.snake.body,
    );
    this.food.setPosition(position);
  }
}
