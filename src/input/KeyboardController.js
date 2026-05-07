import { InputMapper } from './InputMapper.js';

export class KeyboardController {
  constructor({ sceneManager, target = window, inputMapper = new InputMapper() }) {
    this.sceneManager = sceneManager;
    this.target = target;
    this.inputMapper = inputMapper;
    this.onKeyDown = (event) => this.handleKeyDown(event);
  }

  start() {
    this.target.addEventListener('keydown', this.onKeyDown);
  }

  handleKeyDown(event) {
    const action = this.inputMapper.mapKey(event.code);

    if (!action) {
      return;
    }

    event.preventDefault();
    this.sceneManager.handleInput(action);
  }

  destroy() {
    this.target.removeEventListener('keydown', this.onKeyDown);
  }
}
