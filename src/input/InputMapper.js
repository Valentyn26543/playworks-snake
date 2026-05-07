import { InputActions } from './InputActions.js';

export class InputMapper {
  mapKey(code) {
    const keyMap = {
      ArrowUp: InputActions.MOVE_UP,
      KeyW: InputActions.MOVE_UP,
      ArrowDown: InputActions.MOVE_DOWN,
      KeyS: InputActions.MOVE_DOWN,
      ArrowLeft: InputActions.MOVE_LEFT,
      KeyA: InputActions.MOVE_LEFT,
      ArrowRight: InputActions.MOVE_RIGHT,
      KeyD: InputActions.MOVE_RIGHT,
      Enter: InputActions.CONFIRM,
      Space: InputActions.CONFIRM,
    };

    return keyMap[code] ?? null;
  }
}
