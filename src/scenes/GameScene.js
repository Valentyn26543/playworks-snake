import { GAME_OVER_DIALOG } from '../app/constants.js';
import { SnakeGameController } from '../game/SnakeGameController.js';
import { DOWN, LEFT, RIGHT, UP } from '../input/InputActions.js';
import { BackgroundRenderer } from '../renderer/BackgroundRenderer.js';
import { BoardRenderer } from '../renderer/BoardRenderer.js';
import { FoodRenderer } from '../renderer/FoodRenderer.js';
import { HudRenderer } from '../renderer/HudRenderer.js';
import { SnakeRenderer } from '../renderer/SnakeRenderer.js';

export class GameScene {
  constructor({ config, sceneManager }) {
    this.config = config;
    this.sceneManager = sceneManager;
    this.gameController = new SnakeGameController(config.board);
    this.backgroundRenderer = new BackgroundRenderer();
    this.boardRenderer = new BoardRenderer(config);
    this.snakeRenderer = new SnakeRenderer();
    this.foodRenderer = new FoodRenderer();
    this.hudRenderer = new HudRenderer();
    this.accumulatedTime = 0;
    this.hasSentGameOver = false;
  }

  init() {}

  enter() {
    this.accumulatedTime = 0;
    this.hasSentGameOver = false;
    this.gameController.restart();
  }

  update(deltaTime) {
    if (this.hasSentGameOver) {
      return;
    }

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.config.movementInterval) {
      this.accumulatedTime -= this.config.movementInterval;
      this.gameController.update();

      if (this.gameController.isGameOver()) {
        this.hasSentGameOver = true;
        this.sceneManager.switchTo(GAME_OVER_DIALOG, {
          finalScore: this.gameController.getSnapshot().score,
        });
        return;
      }
    }
  }

  render(renderer) {
    const snapshot = this.gameController.getSnapshot();

    this.backgroundRenderer.render(renderer);
    this.hudRenderer.render(renderer, snapshot);
    const boardLayout = this.boardRenderer.render(renderer);
    this.snakeRenderer.render(renderer, snapshot, boardLayout);
    this.foodRenderer.render(renderer, snapshot, boardLayout);
  }

  exit() {
    this.accumulatedTime = 0;
  }

  destroy() {}

  handleInput(action) {
    if ([UP, RIGHT, DOWN, LEFT].includes(action)) {
      this.gameController.changeDirection(action);
    }
  }
}
