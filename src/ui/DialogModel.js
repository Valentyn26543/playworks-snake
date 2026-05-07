export class DialogModel {
  constructor({
    title = '',
    message = '',
    buttons = [],
    onCancel = null,
  } = {}) {
    this.title = title;
    this.message = message;
    this.buttons = buttons;
    this.onCancel = onCancel;
    this.selectedButtonIndex = 0;
    this.updateSelectedButton();
  }

  selectPrevious() {
    if (this.buttons.length === 0) {
      return;
    }

    this.selectedButtonIndex =
      (this.selectedButtonIndex - 1 + this.buttons.length) %
      this.buttons.length;
    this.updateSelectedButton();
  }

  selectNext() {
    if (this.buttons.length === 0) {
      return;
    }

    this.selectedButtonIndex =
      (this.selectedButtonIndex + 1) % this.buttons.length;
    this.updateSelectedButton();
  }

  confirmSelected() {
    this.getSelectedButton()?.trigger();
  }

  cancel() {
    this.onCancel?.();
  }

  getSelectedButton() {
    return this.buttons[this.selectedButtonIndex] ?? null;
  }

  handlePointer(x, y) {
    const buttonIndex = this.buttons.findIndex((button) =>
      button.contains(x, y),
    );

    if (buttonIndex === -1) {
      return false;
    }

    this.selectedButtonIndex = buttonIndex;
    this.updateSelectedButton();
    this.buttons[buttonIndex].trigger();
    return true;
  }

  updateSelectedButton() {
    this.buttons.forEach((button, index) => {
      button.setSelected(index === this.selectedButtonIndex);
    });
  }
}
