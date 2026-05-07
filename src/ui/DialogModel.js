export class DialogModel {
  constructor({ title = '', message = '', buttons = [] } = {}) {
    this.title = title;
    this.message = message;
    this.buttons = buttons;
  }
}
