import { CANCEL, CONFIRM, DOWN, LEFT, RIGHT, UP } from './InputActions.js';

export class InputMapper {
  mapKey(code) {
    const keyMap = {
      ArrowUp: UP,
      ArrowRight: RIGHT,
      ArrowDown: DOWN,
      ArrowLeft: LEFT,
      Enter: CONFIRM,
      Backspace: CANCEL,
    };

    return keyMap[code] ?? null;
  }
}
