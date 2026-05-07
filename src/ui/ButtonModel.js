import { HitArea } from './HitArea.js';

export class ButtonModel {
  constructor({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    label = '',
    selected = false,
    disabled = false,
    onClick = null,
  } = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
    this.selected = selected;
    this.disabled = disabled;
    this.onClick = onClick;
    this.hitArea = new HitArea(x, y, width, height);
  }

  setSelected(value) {
    this.selected = value;
  }

  contains(x, y) {
    return this.hitArea.contains(x, y);
  }

  trigger() {
    if (this.disabled) {
      return;
    }

    this.onClick?.();
  }
}
