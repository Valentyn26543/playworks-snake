import { BackgroundRenderer } from '../renderer/BackgroundRenderer.js';
import { BoardRenderer } from '../renderer/BoardRenderer.js';
import { FoodRenderer } from '../renderer/FoodRenderer.js';
import { SnakeRenderer } from '../renderer/SnakeRenderer.js';

export class GameScene {
  constructor(config) {
    this.config = config;
    this.backgroundRenderer = new BackgroundRenderer();
    this.boardRenderer = new BoardRenderer(config);
    this.foodRenderer = new FoodRenderer();
    this.snakeRenderer = new SnakeRenderer();
  }

  init() {}

  enter() {}

  update() {}

  render(renderer) {
    this.backgroundRenderer.render(renderer);
    const board = this.boardRenderer.render(renderer);

    this.foodRenderer.render(renderer, {
      x: board.playX + board.playWidth / 2,
      y: board.playY + board.playHeight * 0.27,
      size: 62,
    });

    this.snakeRenderer.render(renderer, {
      x: board.playX + board.playWidth / 2,
      y: board.playY + board.playHeight * 0.68,
      size: 138,
      direction: { x: 0, y: -1 },
    });
  }

  exit() {}

  destroy() {}

  handleInput() {}
}
