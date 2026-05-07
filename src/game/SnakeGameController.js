import { GameState } from './GameState.js';

export class SnakeGameController {
  constructor() {
    this.state = GameState.IDLE;
  }

  start() {
    this.state = GameState.RUNNING;
  }

  reset() {
    this.state = GameState.READY;
  }

  update() {}
}
