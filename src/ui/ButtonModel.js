export class ButtonModel {
  constructor({ id = '', label = '', hitArea = null } = {}) {
    this.id = id;
    this.label = label;
    this.hitArea = hitArea;
    this.isEnabled = true;
  }
}
